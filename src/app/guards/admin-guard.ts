import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard{

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
	if (this.authService.loggedIn === "YES") {

		if ( this.authService.userRole ==="ADMIN") {
			return true;
		  } else {
			this.router.navigate(['/access-denied']);
			return false;
		  }
	  } else {
		this.router.navigate(['/login']);
		return false;
	}
  }

  canActivateChild(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
	if (this.authService.loggedIn === "YES") {

		if ( this.authService.userRole ==="ADMIN") {
			return true;
		  } else {
			this.router.navigate(['/access-denied']);
			return false;
		  }
	  } else {
		this.router.navigate(['/login']);
		return false;
	}
  }
}

export const canActivate: CanActivateFn = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot) => {
	if (inject(AuthenticationService).loggedIn === "YES") {

		if ( inject(AuthenticationService).userRole ==="ADMIN") {
			return true;
		  } else {
			inject(Router).navigate(['/access-denied']);
			return false;
		  }
	  } else {
		inject(Router).navigate(['/login']);
		return false;
	}
}



export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot) => {
	if (inject(AuthenticationService).loggedIn === "YES" ) {

		if ( inject(AuthenticationService).userRole === "ADMIN") {
			return true;
		  } else {
			inject(Router).navigate(['/access-denied']);
			return false;
		  }
	  } else {
		inject(Router).navigate(['/login']);
		return false;
	}
}

