import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthenticationService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    
    console.log("ejecutando metodo AuthGuard.canActivated()");
    let result : boolean = this.service.isAuthenticated();

    if (!result){
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    }

    return result;
  }  
}
