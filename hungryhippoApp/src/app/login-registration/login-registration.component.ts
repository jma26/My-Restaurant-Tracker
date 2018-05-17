import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {
  errors: any;

  registration: FormGroup;
  userLogin: FormGroup;

  fullName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  loginEmail: FormControl;
  loginPassword: FormControl;

  constructor(private _registerService: RegisterService, private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
  
  // Create FormControls as part of component properties
  createFormControls() {
    this.fullName = new FormControl('', Validators.required),
    this.email = new FormControl('', Validators.required),
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]),
    this.confirmPassword = new FormControl('', Validators.required)

    this.loginEmail = new FormControl('', Validators.required),
    this.loginPassword = new FormControl('', Validators.required)

  }

  // Bind FormControls to FormGroup model as properties
  createForm() {
    // Login model
    this.userLogin = new FormGroup({
      email: this.loginEmail,
      password: this.loginPassword
    })
    // Registration model
    this.registration = new FormGroup({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    })
  }

  register() {
    console.log('Registration at login-registration component pinging');
    if (this.registration.invalid) {
      console.log(this.registration.value);
      console.log('Form unsuccessfully submitted- Invalid fields present');
    // IF above is good, proceed to create register new user
    } else {
      console.log('Form successfully submitted- Valid fields present');
      let observable = this._registerService.registerUser(this.registration.value);
      observable.subscribe(data => {
        console.log(data);
        if (data['errors']) {
          console.log(data['errors']);
        } else {
          // Return registered user's information & navigate to home component
          console.log(data);
          this.router.navigate(['/home', data['fullName']]);
          console.log('Successful creation');
        }
      })
    }
  }

  login() {
    console.log('Login at login-registration component pinging');
    if (this.userLogin.invalid) {
      console.log(this.userLogin.value);
      console.log(this.userLogin);
      console.log('Unsuccessful login- Invalid fields present');
    // IF above is good, proceed to login service.ts
    } else {
      let observable = this._loginService.loginUser(this.userLogin.value);
      observable.subscribe(data => {
        console.log('Observable data returned ', data);
        if (data['error'] && data['success'] === false) {
          this.errors = data['error'];
        } else if (data['profile'] && data['success'] === true) {
          console.log(data);
          this.router.navigate(['/home', data['profile']['fullName']]);
        }
      })
    }
  }

}
