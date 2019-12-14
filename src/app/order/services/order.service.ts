import { Item } from './../../config/interfaces/item.interface';
import { Observable } from 'rxjs';
import { OrderInformation } from './../../config/interfaces/order.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, first } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class OrderService {
	userId: string;
	cartItem: OrderInformation;
	updatedQuantity: number;
	cartId: string;

	constructor(private angularfireauth: AngularFireAuth, private angularfirestore: AngularFirestore) {
		this.angularfireauth.authState.subscribe((user) => {
			if (user) this.userId = user.uid;
		});
	}

	createOrAddCart(order): Observable<any> {
		return new Observable((obs) => {
			this.angularfirestore
				.collection('Order', (ref) => {
					return ref
						.where('userID', '==', order.userID)
						.where('productID', '==', order.productID)
						.where('payment', '==', false);
				})
				.get()
				.toPromise()
				.then((snapshot) => {
					if (snapshot.empty) {
						this.angularfirestore.collection('Order').add(order);
					} else {
						snapshot.forEach((doc) => {
							this.cartId = doc.id;
							this.cartItem = doc.data();
						});
						this.updateQuantity(this.cartItem, order);
						console.log(this.updatedQuantity);

						this.angularfirestore
							.collection('Order')
							.doc(this.cartId)
							.update({ orderQuantity: this.updatedQuantity });
						obs.next(true);
					}
				});
			// this.angularfirestore.collection("Order").add(order);
		});
	}

	getUserId(): Observable<any> {
		return new Observable((observer) => {
			this.angularfireauth.authState.subscribe((user) => {
				observer.next(user.uid);
			});
		});
	}

	updateQuantity(oldQuantity, newQuantity) {
		this.updatedQuantity = oldQuantity.orderQuantity + newQuantity.orderQuantity;
	}

	getCartItemList(userid): Observable<any> {
		return new Observable((observer) => {
			this.angularfirestore
				.collection('Order', (ref) => {
					return ref.where('userID', '==', userid).where('payment', '==', false);
				})
				.snapshotChanges()
				.subscribe((list) => {
					const cart = list.map((item) => {
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
		return new Observable((observer) => {
			this.angularfirestore
				.collection('Order')
				.doc(cartId)
				.snapshotChanges()
				.pipe(
					map((changes) => {
						const data = changes.payload.data();
						const id = changes.payload.id;
						return { id, data };
					})
				)
				.subscribe((item) => {
					this.cartItem = item;
					observer.next(item);
				});
		});
	}

	updateCartQuantity(oldQuantity, newQuantity, cartid) {
		this.getCartItem(cartid);
		this.updateQuantity(oldQuantity, newQuantity);

		this.angularfirestore.collection('Order').doc(cartid).update({ orderQuantity: this.updatedQuantity });
	}
}
