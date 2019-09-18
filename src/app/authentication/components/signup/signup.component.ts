import { UserInformation } from "./../../../config/interfaces/user.interface";
import { Roles, RolesView } from "./../../../config/enums/paikariEnum";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { first } from "rxjs/operators";
import {
  signupErrorCodes,
  paikariconst,
  urlPaths
} from "src/app/config/constants/paikariConstants";
import { SharedService } from "src/app/shared/services/shared.service";
import { Subject } from "rxjs";
import * as _ from "lodash";
import { ErrorStateMatcherForsignUppage } from "src/app/core/utility-service/utility.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit, OnDestroy {
  signupform: FormGroup;
  roles = RolesView;
  userInformation: UserInformation;
  verificationEmailsent = paikariconst.checkEmail;
  isLoading: boolean = false;
  matcher;
  _unsubscribeAll: Subject<any>;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.makingSignupForm();
    this.setCustomValidation();
  }
  setCustomValidation() {
    this.signupform.updateValueAndValidity();
    this.matcher = new ErrorStateMatcherForsignUppage();
  }
  makingSignupForm() {
    this.signupform = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      phone: ["", Validators.required],
      role: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.signupform.valid) {
      this.isLoading = true;
      this.userInformation = {
        email: this.signupform.value.email,
        password: this.signupform.value.password,
        displayName: this.signupform.value.firstname,
        metaData: {
          firstname: this.signupform.value.firstname,
          lastname: this.signupform.value.lastname,
          email: this.signupform.value.email,
          role: [...this.signupform.value.role],
          phoneNumber: this.signupform.value.phone
          // homeAddress: this.signupform.value.homeAddress,
          // shopAddress: this.signupform.value.shopAddress,
          // enquiryLimit: defaultConst.defaultEnquiryLimit,
          // ratings: defaultConst.defaultRatings
        }
      };
      this.registerUser(this.userInformation);
    } else {
      this.authenticationService.touchAllfields(this.signupform);
    }
  }

  registerUser(user: UserInformation) {
    this.authenticationService
      .signUp(user)
      .pipe(first())
      .subscribe(res => {
        if (res && res.code) {
          _.forEach(signupErrorCodes, (value, key) => {
            if (res.code == value.code) {
              this.openErrorBar(value.message);
            }
          });
        } else {
          this.openVerificationBar();
          this.routeToHome();
        }
        this.isLoading = false;
      });
  }

  openVerificationBar() {
    this.sharedService.openSnackBar({
      data: { message: this.verificationEmailsent, isAccepted: true },
      duration: 6,
      panelClass: ["default-snackbar"],
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  openErrorBar(errorMessage) {
    this.sharedService.openSnackBar({
      data: { message: errorMessage, isAccepted: false },
      duration: 2,
      panelClass: ["default-snackbar"],
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  routeToSignin() {
    this.router.navigate([urlPaths.Authentication.Signin.url]);
  }

  routeToHome() {
    this.router.navigate([urlPaths.Home.customerhome.url]);
  }
  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this._unsubscribeAll.unsubscribe();
  }
}
