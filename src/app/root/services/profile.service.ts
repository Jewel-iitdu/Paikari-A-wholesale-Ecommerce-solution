import { SharedService } from 'src/app/shared/services/shared.service';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { PasswordChangeComponent } from '../password-change/password-change.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private afauth: AngularFireAuth,private sharedService:SharedService,public dialog: MatDialog) { }

  openPasswordChangeModal(width?: string) {
		const dialogRef = this.dialog.open(PasswordChangeComponent, {
			
			minWidth:'450px',
			width: width ? width : '35vw'
			// height:'60vh'
		});

		// dialogRef.afterClosed().subscribe(result => {
		// console.log('The dialog was closed',result);
		// });
	}
  
  touchAllfields(formgroup: FormGroup) {
		this.touchAllFieldsOfForm(formgroup);
  }
  touchAllFieldsOfForm(formgroup:FormGroup){
		let fields=this.getFormControlsValueFromFormGroup(formgroup);
		_.forEach(fields, (value, key) => {
			formgroup.controls[value].markAsTouched();
		});
  }
  getFormControlsValueFromFormGroup(fg: FormGroup) {
		let controls = [];
		_.forEach(Object.keys(fg.controls), function(value: string, key: string) {
			controls = [ ...controls, value ];
		});
		return controls;
  }
  
  updatePassword(oldpassword: string, newpassword: string) {
		const currentEmail = this.afauth.auth.currentUser.email;
		this.afauth.auth
			.signInWithEmailAndPassword(currentEmail, oldpassword)
			.then((res) => {
				if (res && res.user && res.user.emailVerified) {
					this.afauth.auth.currentUser.updatePassword(newpassword);
					// observer.next(errorMessages.password_updated);
					this.openUpdatedSnackBar();
				} else {
					// observer.next(errorMessages.verify_email);
					this.openErrorSnackBar('Verify Email');
					this.resendVerificationEmail();
				}
			})
			.catch((err) => {
				this.openErrorSnackBar('Failed. Wrong credential');
				// observer.next(err && err.code);
			});
  }
  openUpdatedSnackBar() {
		this.sharedService.openSnackBar({
			data: { message: "Password Updated", isAccepted: true },
			duration: 2,
			panelClass: [ 'default-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
		});
	}
	openErrorSnackBar(message?: string) {
		this.sharedService.openSnackBar({
			data: { message: message ? message : "Error. Try again", isAccepted: false },
			duration: 2,
			panelClass: [ 'default-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
		});
  }
  resendVerificationEmail(){
		this.afauth.auth.currentUser.sendEmailVerification();

	}

}
export class ErrorStateMatcherForsignUppage implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		//   const isSubmitted = form && form.submitted;
		//   return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
		return (form.hasError('notMatching') && control.touched)
			? form.hasError('notMatching')
			: control && control.invalid && control.touched ? control.invalid : false;
	}
}
