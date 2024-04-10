import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EditUser } from '../models/edit-user';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': environment.token
    })
  };

  constructor(private http: HttpClient) { }

  editProfile(token: string, user: EditUser): Observable<string> {
    return this.http.put<string>(`${environment.apiUrl}/user/${token}`, user, this.httpOptions);
  }

  getProfile(token: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/${token}`, this.httpOptions);
  }

}
