import { Component, OnInit, HostListener } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  handler: any;
  amount = 500;

  constructor(private paymentSvc: PaymentService) { }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: '/your/awesome/logo.jpg',
      locale: 'auto',
      token: token => {
        // this.paymentSvc.processPayment(token, this.amount)
      }
    });
  }

  handlePayment() {
    this.handler.open({
      name: 'FireStarter',
      excerpt: 'Deposit Funds to Account',
      amount: this.amount
    });
  }

  @HostListener('window:popstate')
    onPopstate() {
      this.handler.close()
    }

}
