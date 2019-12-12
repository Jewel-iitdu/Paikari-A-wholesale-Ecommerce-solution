import { AngularFireAuth } from 'angularfire2/auth';
import { ProductInformation } from './../../config/interfaces/product.interface';
import { map } from 'rxjs/operators';
import { Observable, observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  userId: string;

  constructor(private angularfirestore: AngularFirestore, private angularfireauth: AngularFireAuth) { 
    this.angularfireauth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });
  }

  getUserInfo():Observable<any>{
    return new Observable(observer=>{
      this.angularfireauth.authState.subscribe(user=>{
        if(user){
          this.userId = user.uid;
          this.angularfirestore.collection("Person").doc(this.userId).snapshotChanges().pipe(map(changes=>{
            const data = changes.payload.data();
                const id = changes.payload.id;
                return { id, ...data };
          })).subscribe(res=>{
            observer.next(res)
          })
        }
        else{
          observer.next(null);
        } 
      })
    })
  }

  updateUserInfo(userInfo){
      this.angularfirestore.collection("Person").doc(this.userId).update(userInfo);
    

  }
}
