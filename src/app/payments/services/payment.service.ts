import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private angularFirestore: AngularFirestore) { }

  processPayment(token: any, amount: number, ids) {
    const payment = { token, amount, ids }
    return this.angularFirestore.collection("Payment").add(payment);
  }
}
