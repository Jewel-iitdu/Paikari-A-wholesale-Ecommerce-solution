import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {



  constructor(private afs: AngularFirestore) { }

  getComplainData():Observable<any>{
    return new Observable(observer=>{
      this.afs.collection("Order", ref => {
        return ref
          .where("complaint", "==", true)
      }).snapshotChanges().subscribe(list => {
        const complain = list.map(item => {
          return {
            id: item.payload.doc.id,
            data: item.payload.doc.data()
          };
        });
        observer.next(complain);
      })
    })
  }

  getUserList():Observable<any>{
    return new Observable(observer=>{
      this.afs.collection("Person").snapshotChanges().subscribe(list => {
        const Users = list.map(item => {
          return {
            id: item.payload.doc.id,
            data: item.payload.doc.data()
          };
        });
        observer.next(Users);
      })
    })
  }
  
}
