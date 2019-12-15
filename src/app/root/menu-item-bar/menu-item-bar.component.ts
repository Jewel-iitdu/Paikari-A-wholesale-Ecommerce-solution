import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { paikariconst, paikariMenuConst, urlPaths } from 'src/app/config/constants/paikariConstants';
import {MatMenuTrigger} from '@angular/material'
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  selector: 'app-menu-item-bar',
  templateUrl: './menu-item-bar.component.html',
  styleUrls: ['./menu-item-bar.component.scss']
})
export class MenuItemBarComponent implements OnInit {

  @ViewChild(MatMenuTrigger, { static: true }) trigger: MatMenuTrigger;
  title: string;
  menubar;
  accountbar;
  accountItems;
  Username: string;
  menuItems;
  selectedRow: number;
  
  
  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    this.initiateVariables();
  }
  initiateVariables() {
    this.title = paikariMenuConst.siteName.name;

		// this.makeSideBar();
  }
  // makeSideBar() {
  //   this.menubar = paikariMenuConst.menubar;
  //   this.accountbar = paikariMenuConst.accountbar;
  // }
  // selectRow(index) {
	// 	this.selectedRow = index;		
  // }
  // route(url) {
  //   this.router.navigateByUrl(url);
    
  // }
  openMyMenu() {
    this.trigger.toggleMenu();
  } 
  closeMyMenu() {
    this.trigger.closeMenu();
    console.log('close')
  }

  myAccountClick(){
    this.router.navigate([urlPaths.UserProfile.MyAccount.url]);
  }
  myOrderClick(){
    this.router.navigate([urlPaths.Order.MyOrder.url]);
  }
  transactionHistoryClick(){

  }
  signOutClick(){
    this.auth.signOut();
    this.router.navigate([urlPaths.Home.customerhome.url]);
  }
  routeToSignin() {
    this.router.navigate([urlPaths.Authentication.Signin.url]);
  }

}
