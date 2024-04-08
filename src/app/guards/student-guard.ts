import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { ActivatedRouteSnapshot, CanActivateChildFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard{

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (route.routeConfig?.path === "" || this.authService.userRole==="student") {
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}

export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (route.routeConfig?.path === "" || inject(AuthenticationService).userRole==="student") {
    return true;
  } else {
    inject(Router).navigate(['/access-denied']);
    return false;
  }
}

