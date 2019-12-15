import { OrderInformation } from "./../../../config/interfaces/order.interface";
import { OrderService } from "./../../services/order.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.scss"]
})
export class CartListComponent implements OnInit {
  customerID: string;
  cartList: OrderInformation;
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.setCartInformation();
  }

  setCartInformation() {
    this.orderService.getUserId().subscribe(res => {
      this.customerID = res;
      this.orderService.getCartItemList(res).subscribe(list => {
        this.cartList = list;
        console.log(this.cartList);
      });
    });
  }
}
