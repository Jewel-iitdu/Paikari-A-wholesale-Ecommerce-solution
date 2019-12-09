import {
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { UtilityService } from "src/app/core/utility-service/utility.service";
import { ProductInformation } from "src/app/config/interfaces/product.interface";
import { Observable } from "rxjs";
import { Item } from "src/app/config/interfaces/item.interface";
import { map, first } from "rxjs/operators";
import { Entities } from "src/app/config/enums/paikariEnum";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  userId: string;
  product: any;
  productCollection: AngularFirestoreCollection<ProductInformation>;
  productInfo: Observable<ProductInformation[]>;
  item: Observable<Item[]>;

  constructor(
    private angularfireauth: AngularFireAuth,
    private angularfirestore: AngularFirestore,
    private util: UtilityService
  ) {
    this.angularfireauth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });

    this.productCollection = angularfirestore.collection<ProductInformation>(
      "Product"
    );
  }

  createProduct(productInfo) {
    this.productCollection
      .doc(this.userId)
      .collection("ProductList")
      .add(productInfo);
  }
  addItem(item) {
    this.angularfirestore.collection("items").add(item);
  }

  updateProduct(productInfo, productId) {
    this.productCollection
      .doc(this.userId)
      .collection("ProductList")
      .doc(productId).update(productInfo)
  }

  getAllCategory() {
    this.angularfirestore
      .collection("Categories")
      .get()
      .pipe(first())
      .subscribe(res => {
        console.log(res);
      });
  }

  getProductByUser(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.productCollection
            .doc(this.userId)
            .collection("ProductList")
            .snapshotChanges()
            .subscribe(ress => {
              // console.log(ress);
              observer.next(ress);
            });
        } else {
          observer.next(null);
        }
      });
    });
  }

  getProduct(): Observable<any> {
    return new Observable(observer => {
      this.productCollection
      .get()
      .toPromise()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          // const documentID = doc.id;
          this.productCollection
            .doc(doc.id)
            .collection("ProductList").snapshotChanges().subscribe(ress=>{
              observer.next(ress);
            })
            
        });
      });
    });
  }

  getAllProducts() {}



  getProductByProductId(id): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.productCollection
            .doc(this.userId)
            .collection("ProductList").doc(id)
            .snapshotChanges()
            .pipe(
              map(changes => {
                const data = changes.payload.data();
                const id = changes.payload.id;
                return { id, ...data };
                
              })
              ).subscribe(res =>{
                observer.next(res);
              })
              
        } else {
          observer.next(null);
        }
      });
    });
  }
}
