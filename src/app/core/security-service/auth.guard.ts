import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private af: AngularFireAuth,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Observable(observer=>{
        this.af.authState.subscribe(res=>{
          debugger;
          if(res){
            observer.next(true);
          }
          else if(!res){
            observer.next(false);
            // this.router.navigate(['/authentication']);
          }
        })
      })
  }
  
}
