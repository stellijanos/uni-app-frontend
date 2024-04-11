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
  birthDate: any;
  code: number = Math.floor((Math.random() * 900) + 100);
  current_semester: string = '2';
  current_funding : string = '';


  faculty: string = 'Math and Computer Science';
  section: string = 'Computer Science in german';
  academic_year : string = '2023/2024';
  semester : string = '1';
  funding : string = 'TAX';
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
      this.grade = parseFloat(response.grade.toFixed(2)) ?? 0;
      this.ranking = response.ranking ?? 0;
      this.total_num = response.total ?? 0;
      this.current_funding = this.grade > 7 ? 'Tax free' : 'Tax';
    })
  }

}
