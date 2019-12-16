import { FormBuilder, Validators } from '@angular/forms';
import { paikariconst } from 'src/app/config/constants/paikariConstants';
import { SecurityService } from "src/app/core/security-service/security.service";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { OrderInformation } from "src/app/config/interfaces/order.interface";
import { OrderService } from "../../services/order.service";
import { first } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';
@Component({
  selector: "app-ordered-list",
  templateUrl: "./ordered-list.component.html",
  styleUrls: ["./ordered-list.component.scss"]
})
export class OrderedListComponent implements OnInit {
  userID: string;
  orderList: OrderInformation;
  role: string;
  orderStatus=paikariconst.orderStatus;
  ratingform;
  constructor(
    private orderService: OrderService,
    private security: SecurityService,
    private fb:FormBuilder,
    private sharedService: SharedService

  ) {}

  ngOnInit() {
    this.getRole();
    this.setOrderedItem();
    this.makeRatingForm();
    
  }
  makeRatingForm(){
    this.ratingform = this.fb.group({
      rating: ['', Validators.required],
      complaint:['']
    })
  }
  setOrderedItem() {
    this.orderService.getUserId().subscribe(id => {
      this.userID = id;
      this.security.getRole().subscribe(res => {
        this.role = res;
        if (this.role == "Supplier") {
          this.orderService
            .getOrderListBySupplierId(this.userID)
            .subscribe(list => {
              this.orderList = list;
              // console.log(this.orderList[1].data.status);
              // console.log(list);
            });
        }
        if (this.role == "Customer") {
          this.orderService
            .getOrderListByCustomerId(this.userID)
            .subscribe(list => {
              this.orderList = list;
              // console.log(list);
            });
        }
      });
      // this.orderService.getOrderListBySupplierId(this.userID).subscribe(list=>{
      //       this.orderList = list;
      //       console.log(list)
      //     })
    });
  }

  getRole() {
    this.security.getRole().subscribe(res => {
      this.role = res;
    });
  }

  showSnackbar() {
		this.sharedService.openSnackBar({
			duration: 2,
			data: {
				isAccepted: true,
				message: 'Review Submitted Successfully'
			},
			panelClass: [ 'recovery-snackbar' ]
		});
	}

  getOrderStatus(status){
    let x=[];
    let startPushing=false;
    for(let i of this.orderStatus){
      if(status==i.value || startPushing){
        x.push(i);
        startPushing=true;

      }
    }
    return x;
  }

  updateStatus(item,status){
    this.orderService.updateOrderStatus(item.id,status);
  }

  submitRating(item){
    let rating=this.ratingform.get('rating').value;
    let complain=this.ratingform.get('complaint').value;

   
    this.orderService.getRatings(item.data.supplierID).pipe(first()).subscribe(CurrentRating=>{
      this.orderService.updateRatingStatus(item.id);
      rating=(((rating*20)+CurrentRating)/2);
      this.orderService.updateRatings(item.data.supplierID,rating);
      this.orderService.makeComplain(item.id,complain);
    })
    
    this.showSnackbar();
  }
 
  
 
}
