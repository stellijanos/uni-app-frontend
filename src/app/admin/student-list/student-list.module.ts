import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list.component';
import { AdminComponent } from '../admin.component';


@NgModule({
  declarations: [
    StudentListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StudentListModule { }
