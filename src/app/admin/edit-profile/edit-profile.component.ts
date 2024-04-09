import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditUser } from '../../models/edit-user';
import { AuthenticationService } from '../../authentication/authentication.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {


  editForm: FormGroup = new FormGroup({});

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.editForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\s'-]{0,63}$")]],
      lastname: ['', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\s'-]{0,63}$")]],
      email: ['', [Validators.required, Validators.maxLength(128), Validators.email]],
      birthDate: [ '', Validators.required],
      password: ['',Validators.required]
    })

    let token : string = localStorage.getItem('token') ?? '';

    if (token === "") {
      return;
    }

    this.userService.getProfile(token).subscribe(res => {
      let json_response = JSON.stringify(res);
      let response = JSON.parse(json_response);

      if (response.response !== "success") {
        return;
      }
      this.editForm.patchValue({
        firstname: response.firstname ?? '', 
        lastname: response.lastname ?? '',
        email: response.email ?? '',
        birthDate: response.birthDate ?? ''
      })
    })
  }


  onSubmit() {

    if (this.editForm.valid && this.editForm.touched) {
      let user : EditUser = this.editForm.value;

      let token :string = localStorage.getItem('token') ?? '';

      if (token === "") {
        return;
      }
      this.userService.editProfile(token, user).subscribe( res => {
        this.errorMessage='';
        this.successMessage='';

        let json_response = JSON.stringify(res);
        let response = JSON.parse(json_response);

        if (response.response !== "success") {
          this.errorMessage = response.response;
        } else {
          this.successMessage = "Profile successfully updated!"
        }
        this.editForm.get('password')?.reset('');
      });
    }
  }

  show_password() {
    let password = document.getElementById('password') as HTMLInputElement;
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

