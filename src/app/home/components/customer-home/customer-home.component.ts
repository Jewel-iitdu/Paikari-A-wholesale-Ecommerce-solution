import { AngularFireStorage } from "angularfire2/storage";
import { ProductInformation } from "./../../../config/interfaces/product.interface";
import { CustomerHomeService } from "./../../services/customer-home.service";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Component({
  selector: "app-customer-home",
  templateUrl: "./customer-home.component.html",
  styleUrls: ["./customer-home.component.scss"]
})
export class CustomerHomeComponent implements OnInit {
  productData: ProductInformation;
  firestoreData: Observable<any[]>;

  constructor(
    private homeService: CustomerHomeService,
    private angularfirestore: AngularFirestore
  ) {}

  ngOnInit() {
    // this.homeService.getProduct().subscribe(list=>{
    //   const products = list.map(item => {
    //     return {
    //       id: item.payload.doc.id,
    //       ...item.payload.doc.data()
    //     }
    //   });
    //   // this.productData = products;
    //   console.log(products)
    // })

    
  }
}
