import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    let token: string = localStorage.getItem('token') ?? 'a';

    this.authService.logout(token).subscribe(res => {
      this.router.navigate(['/login']);
    });
  }

}
