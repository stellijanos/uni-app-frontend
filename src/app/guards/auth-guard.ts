import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    let token:string = localStorage.getItem('token') ?? '';

    if (this.authService.isLoggedIn(token)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if (inject(AuthenticationService).isLoggedIn('ok')) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};