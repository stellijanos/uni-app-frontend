import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.authService.getLoginInfo().pipe(
      map(res => {
        let json_res = JSON.stringify(res);
        let response = JSON.parse(json_res);
        if (response.is_logged_in === "YES") {
          if (response.role === "ADMIN") {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/student']);
          }
          return false;
        }
        return true;
      })
    );
  }
}
