import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeModule } from '../home/home.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthenticationModule { }
