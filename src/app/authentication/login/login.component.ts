import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LoginUser } from '../../models/login-user';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup = new FormGroup({});


  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
      password:['',Validators.required]
    });
  }



  onSubmit() {
    if(this.loginForm.valid) {
      let user: LoginUser = this.loginForm.value;

      this.authenticationService.loginUser(user).subscribe( response => {

        this.errorMessage = '';
        console.log(JSON.stringify(response));

        let json_response = JSON.stringify(response);
        let login_response = JSON.parse(json_response);

        if (login_response.response !== "success") {
          this.errorMessage = login_response.response;
        } else {
          this.successMessage = "User successfully logged in!";
          localStorage.setItem('token', login_response.login_token);
          let role = login_response.login_token !== environment.login_token ? 'STUDENT' : 'ADMIN';
        
          if (role !== 'ADMIN') {
            this.router.navigate(['/student']);
          } else  {
            this.router.navigate(['/admin']);
          }
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
}

