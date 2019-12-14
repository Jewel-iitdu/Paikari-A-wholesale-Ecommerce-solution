import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { ProductInformation } from "src/app/config/interfaces/product.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CustomerHomeService {
  productCollection: AngularFirestoreCollection<ProductInformation>;

  constructor(private angularfirestore: AngularFirestore) {
    // this.productCollection = angularfirestore.collection<ProductInformation>(
    //   "Product"
    // );
  }

  getAllProducts(): Observable<any> {
    return new Observable(observer => {
      this.angularfirestore
        .collection<ProductInformation>("Product")
        .snapshotChanges()
        .subscribe(product => {
          observer.next(product);
        });
    });
  }

  
}
