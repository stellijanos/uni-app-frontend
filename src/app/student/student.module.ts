import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student/student.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    StudentComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StudentModule { }
