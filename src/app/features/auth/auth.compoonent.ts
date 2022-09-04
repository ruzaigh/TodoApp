import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {Store} from "@ngrx/store";
import {authLogin} from "./store/actions/auth.actions";

export function passwordMatchValidator(): ValidatorFn{
  return(control:AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if(password && confirmPassword && password !== confirmPassword){
      return {passwordMismatch: true};
    }else {
      return null;
    }
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  toggleSignupView: boolean = false;
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [ Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('',  Validators.required),
  }, { validators: passwordMatchValidator() });
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private store: Store
  ) {}

  ngOnInit() {}

  submitLoginForm() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    // @ts-ignore
    this.store.dispatch(authLogin({ email, password  }));
  }

  submitSignupForm(){
    if(this.signupForm.invalid){
      return;
    }
    const {name, email, password} = this.signupForm.value;
    this.auth.signup(name || '', password || '', email  ||'').subscribe(
      () => {
        this.toastCtrl
          .create({
            position: 'top',
            message: 'Signup Successful',
            duration: 2000,
          })
          .then((toast) => toast.present());
        this.router.navigateByUrl('/home');
      }, (err) => {
        this.toastCtrl
          .create({
            position: 'top',
            message: err.message,
            duration: 2000,
          })
          .then((toast) => toast.present());
      }
    )
  }


   loginFormControl(name: string) {
    return this.loginForm.get(name);
  }
  signupFormControl(name: string) {
    return this.signupForm.get(name);
  }
}
