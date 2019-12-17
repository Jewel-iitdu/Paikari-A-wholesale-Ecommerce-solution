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

  getUserId(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        observer.next(user.uid);
      });
    });
  }

  createProduct(productInfo) {
    this.productCollection.add(productInfo);
  }

  updateProduct(productInfo, productId) {
    this.productCollection.doc(productId).update(productInfo);
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

  getProductBySupplier(): Observable<any> {
    return new Observable(observer => {
      this.angularfireauth.authState.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.angularfirestore
            .collection<ProductInformation>("Product", ref =>
              ref.where("supplierId", "==", this.userId)
            )
            .snapshotChanges()
            .subscribe(product => {
              observer.next(product);
            });
        } else {
          observer.next(null);
        }
      });
    });
  }

  getProfileBySupplierId(supplierID): Observable<any> {
    return new Observable(observer => {
      this.angularfirestore
        .collection("Person")
        .doc(supplierID)
        .snapshotChanges()
        .pipe(
          map(changes => {
            const data = changes.payload.data();
            const id = changes.payload.id;
            return { id, data };
          })
        ).subscribe(profile=>{
          observer.next(profile);
        })
    });
  }

  removeProductByID(id){
    this.angularfirestore.collection("Product").doc(id).delete();
  }

  getProductByProductId(id): Observable<any> {
    return new Observable(observer => {
      this.productCollection
        .doc(id)
        .snapshotChanges()
        .pipe(
          map(changes => {
            const data = changes.payload.data();
            const id = changes.payload.id;
            return { id, data };
          })
        )
        .subscribe(res => {
          observer.next(res);
        });
    });
  }
}
