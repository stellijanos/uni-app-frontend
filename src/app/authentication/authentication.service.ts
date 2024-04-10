import { Injectable, OnInit, inject } from '@angular/core';
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
  private apiIsLoggedInUrl = environment.apiUrl + "/logged_in";


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': environment.token
    })
  };

  constructor(private http: HttpClient) {
    
  }


  registerUser(user: RegisterUser): Observable<string> {
    return this.http.post<string>(this.apiRegisterUrl, user, this.httpOptions);
  }


  loginUser(user: LoginUser):Observable<string> {
    return this.http.post<string>(this.apiLoginUrl, user, this.httpOptions);
  }
  
  logout(token: string): Observable<string> {
    return this.http.get<string>(`${environment.apiUrl}/logout/${token}`, this.httpOptions);
  }

  getLoginInfo(): Observable<string> {
    let token:string = localStorage.getItem('token') ?? 'a';
    return this.http.post<string>(`${this.apiIsLoggedInUrl}/${token}`, null, this.httpOptions);
  }
}

