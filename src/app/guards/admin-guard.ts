import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard{

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Observable<boolean> {
	return this.authService.getLoginInfo().pipe(
		map(response => {
		  let json_response = JSON.stringify(response);
		  let res = JSON.parse(json_response);
		  if (res.is_logged_in !== "YES") {
			this.router.navigate(['/login']);
			return false;
		  }
		  if (res.role !== "ADMIN") {
			this.router.navigate(['/access-denied']);
			return false;
		  }
		  return true;
		})
	  );
  }
}

