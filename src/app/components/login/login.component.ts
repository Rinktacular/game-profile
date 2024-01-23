import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private readonly authService: AuthService) {
  }

  onSubmit(): void {
   const username = this.loginForm.get('username')?.value;
  const password = this.loginForm.get('password')?.value;
    // TODO: Send Form values to service to create accounts.
    this.authService.createUserWithEmailAndPassword(username, password)
    .then(
    )
  }
}
