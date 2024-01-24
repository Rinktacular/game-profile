import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from 'app/services/firebase.service';
import { AuthService } from 'app/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'game-profile';
  showNavigation = false;

  constructor(private readonly firebaseService: FirebaseService, private readonly authService: AuthService) {
    this.firebaseService.getApp();
    this.authService.userAuthSubject.subscribe((value) => {
      // Value is `true` when user has authentication.
      this.showNavigation = value;
    });
  }
}
