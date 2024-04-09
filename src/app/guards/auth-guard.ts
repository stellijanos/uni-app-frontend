import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
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

// export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   if (inject(AuthenticationService).loggedIn === "YES") {
//     return true;
//   } else {
//     inject(Router).navigate(['/login']);
//     return false;
//   }
// };
