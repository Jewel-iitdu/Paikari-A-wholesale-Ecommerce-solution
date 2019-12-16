import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private angularFirestore: AngularFirestore) { }

  processPayment(token: any, amount: number, productID, customerID, date) {
    const payment = { token, amount, productID, customerID, date }
    return this.angularFirestore.collection("Payment").add(payment);
  }

  getPaymentInfoByCustomer(customerID):Observable<any>{
    return new Observable(observer=>{
      this.angularFirestore.collection("Payment", ref => {
        return ref
          .where("customerID", "==", customerID)
      }
      ).snapshotChanges().subscribe(list => {
        const paymentInfo = list.map(item => {
          return {
            id: item.payload.doc.id,
            data: item.payload.doc.data()
          };
        });
        observer.next(paymentInfo);
      });
    })
  }

}
