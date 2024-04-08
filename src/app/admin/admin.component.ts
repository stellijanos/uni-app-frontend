import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  current_url: string = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.current_url = this.router.url;
  }

}
