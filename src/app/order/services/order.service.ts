import { element } from 'protractor';
import { Item } from "./../../config/interfaces/item.interface";
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
    private angularfirestore: AngularFirestore
  ) {}

  createOrAddCart(order): Observable<any> {
    return new Observable(obs => {
      this.angularfirestore
        .collection("Order", ref => {
          return ref
            .where("customerID", "==", order.customerID)
            .where("productID", "==", order.productID)
            .where("payment", "==", false);
        })
        .get()
        .toPromise()
        .then(snapshot => {
          if (snapshot.empty) {
            this.angularfirestore.collection("Order").add(order);
            obs.next(true);
          } else {
            snapshot.forEach(doc => {
              this.cartId = doc.id;
              this.cartItem = doc.data();
            });
            this.updateQuantity(this.cartItem, order);
            console.log(this.updatedQuantity);

            this.angularfirestore
              .collection("Order")
              .doc(this.cartId)
              .update({ orderQuantity: this.updatedQuantity });
            obs.next(true);
          }
        });
      // this.angularfirestore.collection("Order").add(order);
    });
  }

  getUserId(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        observer.next(user.uid);
      });
    });
  }

  updateQuantity(oldQuantity, newQuantity) {
    this.updatedQuantity =
      oldQuantity.orderQuantity + newQuantity.orderQuantity;
  }

  getCartItemList(userid): Observable<any> {
    return new Observable(observer => {
      this.angularfirestore
        .collection("Order", ref => {
          return ref
            .where("customerID", "==", userid)
            .where("payment", "==", false);
        })
        .snapshotChanges()
        .subscribe(list => {
          const cart = list.map(item => {
            return {
              id: item.payload.doc.id,
              data: item.payload.doc.data()
            };
          });
          observer.next(cart);
        });
    });
  }

  getCartItem(cartId): Observable<any> {
    return new Observable(observer => {
      this.angularfirestore
        .collection("Order")
        .doc(cartId)
        .snapshotChanges()
        .pipe(
          map(changes => {
            const data = changes.payload.data();
            const id = changes.payload.id;
            return { id, data };
          })
        )
        .subscribe(item => {
          this.cartItem = item;
          observer.next(item);
        });
    });
  }

  updateCartQuantity(newQuantity, cartid) {
    this.angularfirestore
      .collection("Order")
      .doc(cartid)
      .update({ orderQuantity: newQuantity });
  }

  getOrderListByCustomerId(customerID): Observable<any> {
    return new Observable(observer => {
      this.angularfirestore
        .collection("Order", ref => {
          return ref
            .where("customerID", "==", customerID)
            .where("payment", "==", true);
        })
        .snapshotChanges()
        .subscribe(list => {
          const cart = list.map(item => {
            return {
              id: item.payload.doc.id,
              data: item.payload.doc.data()
            };
          });
          observer.next(cart);
        });
    });
  }
  getOrderListBySupplierId(supplierID): Observable<any> {
    return new Observable(observer => {
      this.angularfirestore
        .collection("Order", ref => {
          return ref
            .where("supplierID", "==", supplierID)
            .where("payment", "==", true);
        })
        .snapshotChanges()
        .subscribe(list => {
          const cart = list.map(item => {
            return {
              id: item.payload.doc.id,
              data: item.payload.doc.data()
            };
          });
          observer.next(cart);
        });
    });
  }

  updatePaymentFlag(productID){
    productID.forEach(element => {
      this.angularfirestore
        .collection("Order", ref => {
          return ref
            .where("productID", "==", element)
        }).get()
        .toPromise()
        .then(snapshot=>{
          snapshot.forEach(doc=>{
            this.angularfirestore.collection("Order").doc(doc.id).update({payment: true,status:"Paid"})
          })
        })          
        });       
  }

  removeFromCart(cartID): Observable<any> {
    return new Observable(observer => {
      this.angularfirestore
        .collection("Order")
        .doc(cartID)
        .delete();
      observer.next(true);
    });
  }

  updateOrderStatus(orderID, statusInfo){
    this.angularfirestore.collection("Order").doc(orderID).update({status: statusInfo});
  }

  updateRatingStatus(orderID){
    this.angularfirestore.collection("Order").doc(orderID).update({rated: true});
  }
  updateRatings(supplierID, ratingValue){
    this.angularfirestore.collection("Person").doc(supplierID).update({rating: ratingValue});
  }
  getRatings(supplierID):Observable<any>{
    return new Observable(obs=>{
      this.angularfirestore.collection("Person").doc(supplierID).snapshotChanges().subscribe(res=>{
        obs.next(res.payload.data()['rating']);
      },err=>{
        obs.error(err);
      })
    })
   
  }

  makeComplain(orderID, complaintext){
    this.angularfirestore.collection("Order").doc(orderID).update({complaint: true, complaintText: complaintext});
  }

}
