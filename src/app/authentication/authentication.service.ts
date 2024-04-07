import { Injectable } from '@angular/core';
import { LoginUser } from '../models/login-user';
import { RegisterUser } from '../models/register-user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private apiLoginUrl = environment.apiUrl + "/login";
  private apiRegisterUrl = environment.apiUrl + "/register";


  constructor(private http: HttpClient) { }


  loginUser(user: LoginUser):Observable<string> {
    return this.http.post<string>(this.apiLoginUrl, user);
  }

  registerUser(user: RegisterUser): Observable<string> {
    return this.http.post<string>(this.apiRegisterUrl, user);
  }
}
