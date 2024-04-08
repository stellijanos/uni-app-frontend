
import { User } from '../../models/user';
import { AdminService } from '../admin.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  students : User[] = [];

  firstnameAsc :boolean = true;
  lastnameAsc : boolean = true;
  emailAsc : boolean = true;
  birthDateAsc : boolean = true;
  
  constructor(private adminService: AdminService, private _liveAnnouncer: LiveAnnouncer) {}


  ngOnInit(): void {
    this.adminService.getAllStudents().subscribe( response => {
      this.students = response;
    });
  }


  sortByFirstname() {
    this.students.sort((a, b) => 
      this.firstnameAsc ? a.firstname.localeCompare(b.firstname) : b.firstname.localeCompare(a.firstname)
    );
    this.firstnameAsc = !this.firstnameAsc;
  }


  sortByLastname() {
    this.students.sort((a, b) => 
      this.lastnameAsc ? a.lastname.localeCompare(b.lastname) : b.lastname.localeCompare(a.lastname)
    );
    this.lastnameAsc = !this.lastnameAsc;
  }

  sortByEmail() {
    this.students.sort((a, b) => 
      this.emailAsc ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)
    );
    this.emailAsc = !this.emailAsc;
  }

  sortByBirthDate() {
    this.students.sort((a, b) => {
      const date_a = a.birthDate.getTime();
      const date_b = b.birthDate.getTime();

      return this.birthDateAsc ? date_a - date_b : date_b - date_a;
    });
     
    this.birthDateAsc = !this.birthDateAsc;
  }

  

}
