import { SecurityService } from './../../core/security-service/security.service';
import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, from } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Router } from '@angular/router';
import { paikariconst, urlPaths } from 'src/app/config/constants/paikariConstants';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

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
  role;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private auth: AuthenticationService, private securityService: SecurityService) {}

  ngOnInit() {
    this.initiateVariables();
		// this.selectedRow = 0;
    // this.route(paikariconst.sidebar[0].url);
    this.securityService.getRole().subscribe(res=>{
      this.role = res;
    })
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
  
  logOut(){
    this.auth.signOut();
    this.router.navigate([urlPaths.Home.customerhome.url]);
  }

  routeToSignin() {
    this.router.navigate([urlPaths.Authentication.Signin.url]);
  }
}
