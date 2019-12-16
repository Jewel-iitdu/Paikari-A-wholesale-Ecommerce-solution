import { OrderService } from './../../../order/services/order.service';
import { PaymentService } from './../../../payments/services/payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  paymentInfo;

  constructor(private paymentServie: PaymentService, private orderService: OrderService) { }

  ngOnInit() {
    this.setPaymentInfo();
  }
  setPaymentInfo() {
    this.orderService.getUserId().subscribe(res=>{
      this.paymentServie.getPaymentInfoByCustomer(res).subscribe(res=>{
        this.paymentInfo = res;
      })
    })
  }

}
