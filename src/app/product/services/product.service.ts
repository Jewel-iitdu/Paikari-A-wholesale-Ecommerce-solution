import { AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { UtilityService } from "src/app/core/utility-service/utility.service";
import { ProductInformation } from "src/app/config/interfaces/product.interface";
import { Observable } from "rxjs";
import { Item } from 'src/app/config/interfaces/item.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ProductService {
  userId: string;
  productCollection: AngularFirestoreCollection<ProductInformation>;
  productInfo: Observable<ProductInformation[]>;
  // itemsCollection: AngularFirestoreCollection<Item>;
  item: Observable<Item[]>;
  // itemDoc: AngularFirestoreDocument<Item>;

  constructor(
    private angularfireauth: AngularFireAuth,
    private angularfirestore: AngularFirestore,
    private util: UtilityService
  ) {
    // this.itemsCollection = this.angularfirestore.collection('items', ref => ref.orderBy('title','asc'));
    // this.items = this.itemsCollection.snapshotChanges().pipe(map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Item;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   });
    // }));
  }

  // createProduct(productInfo) {
  //   // this.angularfireauth.authState.subscribe(user => {
  //   //   if (user) this.userId = user.uid;
  //   // });
  //   return this.angularfirestore
  //     .collection("/Product").add(productInfo);
  // }

  createProduct(productInfo){
    this.angularfireauth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });
    // this.angularfirestore.collection("Product").doc(this.userId).set(productInfo);
    this.angularfirestore.collection("Product").add(productInfo);
  }
  addItem(item){
    this.angularfirestore.collection("items").add(item);
  }
}
