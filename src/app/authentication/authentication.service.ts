import { Injectable } from '@angular/core';
import { LoginUser } from '../models/login-user';
import { RegisterUser } from '../models/register-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private apiLoginUrl = environment.apiUrl + "/login";
  private apiRegisterUrl = environment.apiUrl + "/register";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': environment.token
    })
  };

  constructor(private http: HttpClient) { }


  loginUser(user: LoginUser):Observable<string> {
    return this.http.post<string>(this.apiLoginUrl, user);
  }

  registerUser(user: RegisterUser): Observable<string> {
    
    return this.http.post<string>(this.apiRegisterUrl, user, this.httpOptions);
  }
}