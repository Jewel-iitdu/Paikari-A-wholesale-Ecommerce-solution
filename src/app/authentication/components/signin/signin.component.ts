import { UserInformation } from './../../../config/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { group } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidationErrorMessages } from 'src/app/config/validators/errormessages.validator';
import { UtilityService } from 'src/app/core/utility-service/utility.service';
import { first } from 'rxjs/operators';
import { urlPaths, signinErrorCode } from 'src/app/config/constants/paikariConstants';
import * as _ from "lodash";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  isLoading:boolean = false;
  userInformation: UserInformation;
  signinform: FormGroup;
  

  constructor(
		private authenticationservice: AuthenticationService,
		private fb: FormBuilder,
		private router: Router,
		// private errorMessages: ValidationErrorMessages,
		private util: UtilityService
		) { }


  ngOnInit() {
   this.makingSignInForm();
  }
  makingSignInForm() {
    this.signinform = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', Validators.required ]
    });
  }

  onSubmit() {
		if(this.signinform.valid){
			this.isLoading = true;
			this.userInformation = {
				email: this.signinform.value.email,
				password: this.signinform.value.password
			};
			// setTimeout(()=>{
			// 	this.signinUser(this.userInformation);
			// }, 4000);
			this.signinUser(this.userInformation);
		}
		
	}
  signinUser(user: UserInformation) {
		this.authenticationservice.signin(user).pipe(first()).subscribe((res) => {
			if (res && res.code) {
				console.log(res.code);
				this.validateSignIn(res.code);
				this.isLoading = false;
			} else {
				this.router.navigate([ urlPaths.Home.customerhome.url ]);
				this.isLoading = false;

			}
		});
  }
  
  validateSignIn(errorCode) {
		this.updateform();
		
		let errobj={};
		errobj[errorCode]=true;
		if(errorCode==signinErrorCode["Wrong password"].code){
			this.signinform.controls.password.setErrors(errobj);
		}
		else{
			this.signinform.controls.email.setErrors(errobj);
		}
	}

	updateform() {
		let controlsvalues = this.util.getFormControlsValueFromFormGroup(this.signinform);
		_.forEach(controlsvalues, (value) => {
			this.signinform.get(value).markAsTouched();
		});
	}

	// emailError() {
	// 	// return 'asdf';
	// 	return this.errorMessages.authMessageForEmail(this.signinform.get('email'));
	// }
	// passwordError(){
	// 	return this.errorMessages.authMessageForPassword(this.signinform.get('password'));
	// }

}
