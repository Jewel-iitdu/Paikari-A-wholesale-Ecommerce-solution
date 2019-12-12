import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { paikariconst, paikariMenuConst } from 'src/app/config/constants/paikariConstants';
import {MatMenuTrigger} from '@angular/material'

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
  
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.initiateVariables();
  }
  initiateVariables() {
    this.title = paikariMenuConst.siteName.name;

		this.makeSideBar();
  }
  makeSideBar() {
    this.menubar = paikariMenuConst.menubar;
    this.accountbar = paikariMenuConst.accountbar;
  }
  selectRow(index) {
		this.selectedRow = index;		
  }
  route(url) {
    this.router.navigateByUrl(url);
    
  }
  openMyMenu() {
    this.trigger.toggleMenu();
  } 
  closeMyMenu() {
    this.trigger.closeMenu();
    console.log('close')
  }

}
