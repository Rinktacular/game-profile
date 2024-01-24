import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, GoogleAuthError } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  errorMessage: string = '';
  registrationView = false;

  constructor(private readonly authService: AuthService, private readonly router: Router) {
    this.authService.userAuthSubject.subscribe((value) => {
      console.log('value', value);
      if (!!value) { this.router.navigate([''])}
    });
  }

  /**
   * Attempt to log in an existing User.
   */
  onLoginUserSubmit(): void {
    this.errorMessage = '';
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.signInWithEmailAndPassword(email, password)
    .then(() => this.router.navigate(['']))
    .catch((error: GoogleAuthError) => {
      if(error.message.includes('invalid-credential')) {
        this.errorMessage = 'Invalid Credentials'
      }
      this.errorMessage = error.message;
    });
  }

  /**
   * Attempt to create a new account for a User using Email and Password.
   */
  onCreateUserSubmit(): void {
    this.errorMessage = '';
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.createUserWithEmailAndPassword(email, password)
    .then(() => this.router.navigate(['']))
    .catch((error: GoogleAuthError) => {
      if(error.message.includes('email-already-in-use')) {
        this.errorMessage = 'Email already in use';
      }
    });
  }
}
