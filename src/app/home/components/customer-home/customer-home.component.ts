import { ProductService } from './../../../product/services/product.service';
import { OrderInformation } from './../../../config/interfaces/order.interface';
import { OrderService } from './../../../order/services/order.service';
import { ProductInformation } from "./../../../config/interfaces/product.interface";
import { CustomerHomeService } from "./../../services/customer-home.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import * as firebase from "firebase/app";

@Component({
  selector: "app-customer-home",
  templateUrl: "./customer-home.component.html",
  styleUrls: ["./customer-home.component.scss"]
})
export class CustomerHomeComponent implements OnInit {
  productData: ProductInformation;
  firestoreData: Observable<any[]>;
  orderInfo: OrderInformation;
  singleProduct: ProductInformation;
  constructor(
    private homeService: CustomerHomeService,
    private orderService: OrderService, private productService: ProductService
  ) {}

  ngOnInit() {
    
    this.homeService.getAllProducts().subscribe(
      list => {
          const products = list.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        });
        
        this.productData = products;
        // console.log(this.productData)
  })
    
  }

  addToCart(product){
    this.singleProduct =product;
    // console.log(this.singleProduct)
    this.orderInfo ={
      productID: this.singleProduct.id,
      orderQuantity: this.singleProduct.productquantity,
      payment: false,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      userID: this.orderService.userId
    }
    this.orderService.createOrAddCart(this.orderInfo);
  }

}
