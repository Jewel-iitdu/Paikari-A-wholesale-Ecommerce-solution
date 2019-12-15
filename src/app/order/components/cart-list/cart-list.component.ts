import { environment } from '../../../../environments/environment';
import { Component, OnInit, HostListener } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderInformation } from '../../../config/interfaces/order.interface';
import { PaymentService } from '../../../payments/services/payment.service';


@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.scss"]
})
export class CartListComponent implements OnInit {
  customerID: string;
  cartList: OrderInformation;
  handler: any;
  amount = 500;
  orderIDs=["asdw", "dddd"];

  constructor(private orderService: OrderService,private paymentSvc: PaymentService) {}

  ngOnInit() {
    this.setCartInformation();
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      // image: '/your/awesome/logo.jpg',
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.amount, this.orderIDs)
      }
    });
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

  handlePayment() {
    this.handler.open({
      name: 'paikari.com',
      excerpt: 'Deposit Funds to Account',
      amount: this.amount
    });
  }

  @HostListener('window:popstate')
    onPopstate() {
      this.handler.close()
    }
}
