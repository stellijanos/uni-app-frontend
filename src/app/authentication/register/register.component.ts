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

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\s'-]{0,63}$")]],
      lastname: ['', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\s'-]{0,63}$")]],
      email: ['', [Validators.required, Validators.maxLength(128), Validators.email]],
      birthDate: ['', Validators.required],
      password: ['',[Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let user: RegisterUser = this.registerForm.value;

      this.authenticationService.registerUser(user).subscribe( (response) => {

        this.errorMessage = '';
        // console.log(JSON.stringify(response));

        let json_response = JSON.stringify(response);
        let register_response = JSON.parse(json_response);

        if (register_response.response !== "success") {
          this.errorMessage = register_response.response;
        } else {
          this.successMessage = "User successfully registered!";
        }
      });
    }
  }

  show_password() {
    let password =  document.getElementById('password') as HTMLInputElement;
    let show_password = document.getElementById('show-password') as HTMLSpanElement;
    if (password && show_password) {
      if (password.type === "text") {
        password.type = "password";
        show_password.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
      } else {
        password.type = "text";
        show_password.innerHTML = '<i class="bi bi-eye-fill"></i>';
      }
    }
  }

  getCurrentRoute() {
    return this.router.url;
  }

}

