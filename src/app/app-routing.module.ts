import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { UnauthorizedComponent } from './authentication/unauthorized/unauthorized.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';
import { StudentComponent } from './student/student.component';
import { StudentGuard } from './guards/student-guard';

const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: "login", component:LoginComponent},
  {path: "register", component:RegisterComponent},
  {path: "unauthorized", component:UnauthorizedComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], canActivateChild: [AdminGuard]},
  {path: 'student', component:StudentComponent, canActivate: [AuthGuard], canActivateChild: [StudentGuard]},
  {path: 'access-denied', component: UnauthorizedComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


