import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserInformation, CustomerUserInformation } from 'src/app/config/interfaces/user.interface';
import { Observable } from 'rxjs';
import { Entities } from 'src/app/config/enums/paikariEnum';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/core/utility-service/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private angularfireauth: AngularFireAuth, private angularfirestore: AngularFirestore, private util:UtilityService) { }
  
  signUp(user: UserInformation): Observable<any> {
		return new Observable((observer) => {
			this.angularfireauth.auth
				.createUserWithEmailAndPassword(user.email, user.password)
				.then((accepted) => {
					user.metaData.uid = accepted.user.uid;
					this.createCustomUser(user.metaData);
					this.sendEmailVerification();
					observer.next(accepted);
				})
				.catch((err) => {
					observer.next(err);
				});
		});
  }
  createCustomUser(user: CustomerUserInformation) {
		let personCollection = this.angularfirestore.collection<UserInformation>(Entities.Person);
		personCollection.doc(user.uid).set(user);
	}
  
  getCurrentUser(){
		return this.angularfireauth.auth.currentUser;
	}

  sendEmailVerification() {
    this.angularfireauth.auth.currentUser.sendEmailVerification();
  }

  signin(user: UserInformation): Observable<any> {
		return new Observable((observer) => {
			this.angularfireauth.auth
				.signInWithEmailAndPassword(user.email, user.password)
				.then((acc) => {
					observer.next(acc);
				})
				.catch((err) => {
					observer.next(err);
				});
		});
  }
  touchAllfields(group:FormGroup){
		this.util.touchAllFieldsOfForm(group);
	}
}
