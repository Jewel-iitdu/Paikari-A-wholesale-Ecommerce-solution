import { SecurityService } from './../../../core/security-service/security.service';
import { ProfileService } from './../../../root/services/profile.service';
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
  role;

  constructor(private customerService: CustomerService,private router: Router,private profileService:ProfileService, private sec:SecurityService) { }

  ngOnInit() {
    this.customerService.getUserInfo().subscribe(res=>{
      
      this.userInfo = res;
      // console.log(this.userInfo)
    })
    this.sec.getRole().subscribe(res=>{
      this.role = res;
    })

  }

  routeToUpdateProfile(){
    this.router.navigate([urlPaths.UserProfile.UpdateProfile.url]);
  }
  openChangePasswordModal() {
		this.profileService.openPasswordChangeModal();
	}

}
