import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Router } from '@angular/router';
import { paikariconst } from 'src/app/config/constants/paikariConstants';

@Component({
  selector: "app-nav-side-bar",
  templateUrl: "./nav-side-bar.component.html",
  styleUrls: ["./nav-side-bar.component.scss"]
})
export class NavSideBarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  title: string;
  sidebar;
  Username: string;
  menuItems;
  selectedRow: number;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  ngOnInit() {
    this.initiateVariables();
		this.selectedRow = 0;
		this.route(paikariconst.sidebar[0].url);
  }
  initiateVariables() {
    this.title = paikariconst.siteName.name;

		this.makeSideBar();
  }
  makeSideBar() {
    this.sidebar = paikariconst.sidebar;
  }
  route(url) {
    this.router.navigateByUrl(url);
    
  }
  selectRow(index) {
		this.selectedRow = index;
		
	}
}
