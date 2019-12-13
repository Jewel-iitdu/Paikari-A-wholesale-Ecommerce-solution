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
  updatedQuantity: number;
  cartId: string;

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
          .where("payment", "==", false);
      })
      .get().toPromise().then(snapshot=>{
        if(snapshot.empty){
          this.angularfirestore.collection("Order").add(order);
        }
        else{
          snapshot.forEach(doc=>{
            this.cartId = doc.id;
            this.cartItem = doc.data();
          })
          this.updateQuantity(this.cartItem, order);
          console.log(this.updatedQuantity)
          this.angularfirestore.collection("Order").doc(this.cartId).update({orderQuantity: this.updatedQuantity})
        }
      })
    // this.angularfirestore.collection("Order").add(order);
  }

  getUserId(): Observable<any> {
    return new Observable(observer=>{
      this.angularfireauth.authState.subscribe(user => {
      observer.next(user.uid)
      });
    })
  }

  updateQuantity(oldQuantity, newQuantity) {
    this.updatedQuantity = oldQuantity.orderQuantity + newQuantity.orderQuantity;
  }
}
