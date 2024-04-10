
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
  filteredStudents : User[] = [];

  firstnameAsc :boolean = true;
  lastnameAsc : boolean = true;
  emailAsc : boolean = true;
  birthDateAsc : boolean = true;
  gradeAsc : boolean = true;

  
  constructor(private adminService: AdminService) {}


  ngOnInit(): void {
    this.refreshList();
  }


  sortByFirstname() {
    this.filteredStudents.sort((a, b) => 
      this.firstnameAsc ? a.firstname.localeCompare(b.firstname) : b.firstname.localeCompare(a.firstname)
    );
    this.firstnameAsc = !this.firstnameAsc;
  }


  sortByLastname() {
    this.filteredStudents.sort((a, b) => 
      this.lastnameAsc ? a.lastname.localeCompare(b.lastname) : b.lastname.localeCompare(a.lastname)
    );
    this.lastnameAsc = !this.lastnameAsc;
  }

  sortByEmail() {
    this.filteredStudents.sort((a, b) => 
      this.emailAsc ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)
    );
    this.emailAsc = !this.emailAsc;
  }

  sortByBirthDate() {
    this.filteredStudents.sort((a, b) => {
      const date_a = new Date(a.birthDate).getTime();
      const date_b = new Date(b.birthDate).getTime();

      return this.birthDateAsc ? date_a - date_b : date_b - date_a;
    });
     
    this.birthDateAsc = !this.birthDateAsc;
  }

  sortByGrade() {
    this.filteredStudents.sort((a,b) => this.gradeAsc ? a.grade - b.grade : b.grade - a.grade );
    this.gradeAsc = !this.gradeAsc;
  }



  deleteStudent(id: number) {
    this.adminService.deleteStudent(id).subscribe(response => {
      console.log(response);
      this.students = this.students.filter(student => student.id !== id);
      this.filteredStudents = this.filteredStudents.filter(student => student.id !== id);
    });
    console.log(id);
  }

  searchStudents(event: Event) {
      let searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

      this.filteredStudents = this.students.filter( student => 
        student.firstname.toLowerCase().includes(searchTerm) || 
        student.lastname.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.birthDate.toString().includes(searchTerm)
      )
  }

  refreshList() {
    this.adminService.getAllStudents().subscribe( response => {
      this.students = response;
      this.filteredStudents = this.students;
    });
  }
  
}
