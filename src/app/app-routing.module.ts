import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { UnauthorizedComponent } from './authentication/unauthorized/unauthorized.component';
import { AdminGuard} from './guards/admin-guard';
import { StudentComponent } from './student/student.component';
import { StudentGuard } from './guards/student-guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { StudentListComponent } from './admin/student-list/student-list.component';
import { LogoutComponent } from './authentication/logout/logout.component';


const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: "login", component:LoginComponent},
  {path: "register", component:RegisterComponent},
  {path: "logout", component:LogoutComponent},
  {path: "unauthorized", component:UnauthorizedComponent},
  // {path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
  //   {path: 'students', component:StudentListComponent},
  //   {path: 'grades', component: GradeComponent},
  // ]},
  {path : 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'admin/students', component: StudentListComponent, canActivate: [AdminGuard]},
  {path: 'student', component:StudentComponent, canActivate:[StudentGuard]},
  {path: 'access-denied', component: UnauthorizedComponent},
  {path: '**', component: PageNotFoundComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

