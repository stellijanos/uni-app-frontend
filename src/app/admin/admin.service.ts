import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { EditUser } from '../models/edit-user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiStudentsUrl = environment.apiUrl + "/students";
  private apiStudentUrl = environment.apiUrl + "/student";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': environment.token
    })
  };

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>(this.apiStudentsUrl, this.httpOptions);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>( `${this.apiStudentUrl}/${id}` , this.httpOptions);
  }
}

