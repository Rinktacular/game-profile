import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  achievements:{game: string, achievement: string, value: string}[] = [];

  gameForm = new FormGroup({
    game: new FormControl(),
    achievement: new FormControl(),
    value: new FormControl()
  });

  onGameSubmit(): void {
    console.log('are we doing it?');
    const game = this.gameForm.get('game')?.value;
    const achievement = this.gameForm.get('achievement')?.value;
    const value = this.gameForm.get('value')?.value;
    this.achievements.push({game: game, achievement: achievement, value: value});
    this.gameForm.reset();
  }
}
