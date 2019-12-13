import { Observable } from "rxjs";
import { OrderInformation } from "./../../config/interfaces/order.interface";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { map, first } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class OrderService {
  userId: string;
  cartItem: OrderInformation;

  constructor(
    private angularfireauth: AngularFireAuth,
    private angularfirestore: AngularFirestore,
    
  ) {
    this.angularfireauth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });
  }

  createOrAddCart(order) {
    this.angularfirestore
      .collection("Order", ref => {
        return ref
          .where("userID", "==", order.userID)
          .where("productID", "==", order.productID)
          .where("payment", "==", "false");
      })
      .snapshotChanges()
      .subscribe(res => {
        console.log(res);
      });
    // this.angularfirestore.collection("Order").add(order);
  }
  getCartItem(order): Observable<any> {
    return new Observable(observer => {
      this.angularfirestore
        .collection<OrderInformation>("Order", ref =>
          ref
            .where("userID", "==", order.userID)
            .where("productID", "==", order.productID)
            .where("payment", "==", "false")
        )
        .snapshotChanges()
        .subscribe(res => {
          observer.next(res);
          console.log(res);
        });
    });
  }
  updateQuantity() {}
}
