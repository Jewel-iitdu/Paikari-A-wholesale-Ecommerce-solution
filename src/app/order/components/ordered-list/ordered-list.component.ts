import { SecurityService } from "src/app/core/security-service/security.service";
import { Component, OnInit } from "@angular/core";
import { OrderInformation } from "src/app/config/interfaces/order.interface";
import { OrderService } from "../../services/order.service";

@Component({
  selector: "app-ordered-list",
  templateUrl: "./ordered-list.component.html",
  styleUrls: ["./ordered-list.component.scss"]
})
export class OrderedListComponent implements OnInit {
  userID: string;
  orderList: OrderInformation;
  role: string;

  constructor(
    private orderService: OrderService,
    private security: SecurityService
  ) {}

  ngOnInit() {
    this.getRole();
    this.setOrderedItem();
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
              console.log(list);
            });
        }
        if (this.role == "Customer") {
          this.orderService
            .getOrderListByCustomerId(this.userID)
            .subscribe(list => {
              this.orderList = list;
              console.log(list);
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
}
