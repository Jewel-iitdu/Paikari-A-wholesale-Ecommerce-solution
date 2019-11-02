import { AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { UtilityService } from "src/app/core/utility-service/utility.service";
import { ProductInformation } from "src/app/config/interfaces/product.interface";
import { Observable } from "rxjs";
import { Item } from 'src/app/config/interfaces/item.interface';
import { map, first } from 'rxjs/operators';
import { Entities } from 'src/app/config/enums/paikariEnum';
import * as firebase from 'firebase';

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
    this.angularfireauth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });

    this.productCollection = angularfirestore.collection<ProductInformation>('Product');
  }

  // createProduct(productInfo) {
  //   // this.angularfireauth.authState.subscribe(user => {
  //   //   if (user) this.userId = user.uid;
  //   // });
  //   return this.angularfirestore
  //     .collection("/Product").add(productInfo);
  // }

  

  createProduct(productInfo){
    
    // this.angularfirestore.collection("Product").doc(this.userId).set(productInfo);
    // this.angularfirestore.collection("Product").add(productInfo);
    // let productCollection = this.angularfirestore.collection<ProductInformation>(Entities.Product);
    // productCollection.doc(this.userId).collection("productList").add(productInfo);

    this.productCollection.doc(this.userId).collection("ProductList").add(productInfo);
    
  }
  addItem(item){
    this.angularfirestore.collection("items").add(item);
  }
  
  getAllCategory(){
    // return this.angularfirestore.collection('/categories', {
    //   query: {
    //     orderByChild: 'name'
    //   }
    // });
  //   return this.angularfirestore.collection("Catergories").get().then(querySnapshot=> {
  //     querySnapshot.forEach(doc=> {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, " => ", doc.data());
  //     });
  // });
  this.angularfirestore.collection('Categories').get().pipe(first()).subscribe(res=>{
    console.log(res);
  })
  }
}
