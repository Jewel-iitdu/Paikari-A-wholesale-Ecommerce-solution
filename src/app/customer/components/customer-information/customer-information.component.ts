import { CustomerUserInformation } from './../../../config/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { urlPaths } from 'src/app/config/constants/paikariConstants';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss']
})
export class CustomerInformationComponent implements OnInit {
  userInfo: CustomerUserInformation;

  constructor(private customerService: CustomerService,private router: Router) { }

  ngOnInit() {
    this.customerService.getUserInfo().subscribe(res=>{
      
      this.userInfo = res;
      console.log(this.userInfo)
    })
  }

  routeToUpdateProfile(){
    this.router.navigate([urlPaths.UserProfile.UpdateProfile.url]);
  }

}
