import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
