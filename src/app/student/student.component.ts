import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {


  firstname :string = '';
  lastname :string = '';
  email: string = '';
  birthDate: Date = new Date();
  grade : number = 0;
  ranking: number = 0;
  total_num: number = 0;


  constructor(private userService: UserService) {}

  ngOnInit(): void {

    let token : string = localStorage.getItem('token') ?? '';

    if (token === "") {
      return;
    }

    this.userService.getProfile(token).subscribe(res => {
      let json_response = JSON.stringify(res);
      let response = JSON.parse(json_response);

      if (response.response !== "success") {
        return;
      }

      this.firstname = response.firstname ?? '';
      this.lastname = response.lastname ?? '';
      this.email = response.email ?? '';
      this.birthDate = response.birthDate ?? '';
      this.grade = response.grade ?? 0;
      this.ranking = response.ranking ?? 0;
      this.total_num = response.total ?? 0;
    })
  }

}
