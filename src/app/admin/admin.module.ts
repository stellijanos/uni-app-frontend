import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentListComponent } from './student-list/student-list.component';



@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
