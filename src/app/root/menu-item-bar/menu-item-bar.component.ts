import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { paikariconst, paikariMenuConst } from 'src/app/config/constants/paikariConstants';

@Component({
  selector: 'app-menu-item-bar',
  templateUrl: './menu-item-bar.component.html',
  styleUrls: ['./menu-item-bar.component.scss']
})
export class MenuItemBarComponent implements OnInit {

  title: string;
  menubar;
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
  }
  selectRow(index) {
		this.selectedRow = index;		
  }
  route(url) {
    this.router.navigateByUrl(url);
    
  }

}
