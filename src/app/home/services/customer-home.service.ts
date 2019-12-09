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

  getAllProduct(): Observable <any> {
    debugger
    return new Observable(observer =>{
    this.productCollection
      .get()
      .toPromise()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const documentID = doc.id;
          this.productCollection
            .doc(documentID)
            .collection("ProductList").snapshotChanges().subscribe(ress=>{
              observer.next(ress);
            })
            
        });
      });
    })
  }

  getProduct(): Observable<any> {
    return new Observable(observer => {
      this.angularfirestore.collection('Product').get().toPromise().then(document=>{
        observer.next(document.docs)
      })
      
    });
  }

 
  getDocuments(){
    return this.angularfirestore.collection('Product').snapshotChanges().forEach(e=>{
      
    });
  }
  getCollections(id){
    // const collectionId = id;
    this.productCollection.doc(id).collection('ProductList').snapshotChanges().subscribe(list =>{
      const products = list.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        }
      });
      return products;
    })
  }

  
}