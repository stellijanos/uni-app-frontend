import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { StudentListComponent } from './student-list/student-list.component';



@NgModule({
  declarations: [
    AdminComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
