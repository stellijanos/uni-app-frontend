import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { RegisterUser } from '../../models/register-user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern("/^[A-Z][a-zA-Z\s'-]{0,63}$/")]],
      lastname: ['', [Validators.required, Validators.pattern("/^[A-Z][a-zA-Z\s'-]{0,63}$/")]],
      email: ['', [Validators.required, Validators.maxLength(128)]],
      birthDate: ['', Validators.required],
      password: ['',[Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let user: RegisterUser = this.registerForm.value;

      this.authenticationService.registerUser(user).subscribe( result => {
        if (result === "success") {
          //TODO
        }
      });
    }
  }
}
