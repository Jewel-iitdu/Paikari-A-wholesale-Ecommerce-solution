import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { group } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
		private fb: FormBuilder,
		private router: Router
		) { }

  signinform: FormGroup;

  ngOnInit() {
   this.makingSignInForm();
  }
  makingSignInForm() {
    this.signinform = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', Validators.required ]
    });
  }

}
