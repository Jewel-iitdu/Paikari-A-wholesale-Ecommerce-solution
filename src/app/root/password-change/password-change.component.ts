import { ProfileService, ErrorStateMatcherForsignUppage } from './../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  changePasswordForm: FormGroup;
	passwordgroup: any = {};
	matcher;
	// errormessages = errorMessages;
	constructor(
		private fb: FormBuilder,
		private profileservice: ProfileService,
		public dialogRef: MatDialogRef<PasswordChangeComponent>
	) {}

	ngOnInit() {
		this.makePasswordChangeForm();
		// this.setCustomValidation();
		// this.getProfileInformation();
	}

	makePasswordChangeForm() {
		this.changePasswordForm = this.fb.group({
			oldpassword: [ '', [ Validators.required ] ],
			newpassword: [ '', [ Validators.required ] ],
			// confirmpassword: [ '', [ Validators.required ] ]
		});
	}

	onSubmit() {
		if (this.changePasswordForm.valid) {
			this.setPassword();
			this.updatePassword(this.passwordgroup);
		} else {
			this.updateFields();
		}
	}

	updateFields() {
		this.profileservice.touchAllfields(this.changePasswordForm);
	}

	setPassword() {
		this.passwordgroup.oldpassword = this.changePasswordForm.value.oldpassword;
		this.passwordgroup.newpassword = this.changePasswordForm.value.newpassword;
		// this.passwordgroup.confirmpassword = this.changePasswordForm.value.confirmpassword;
	}

	passwordMatchValidator(group: FormGroup): any {
		if (group) {
			if (group.get('newpassword').value !== group.get('confirmpassword').value) {
				return { notMatching: true };
			}
		}

		return null;
	}
	setCustomValidation() {
		this.changePasswordForm.setValidators(this.passwordMatchValidator);
		this.changePasswordForm.updateValueAndValidity();
		this.matcher = new ErrorStateMatcherForsignUppage();
	}

	updatePassword(passwords) {
    this.profileservice.updatePassword(passwords.oldpassword, passwords.newpassword);
		this.dialogRef.close();
    
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}
