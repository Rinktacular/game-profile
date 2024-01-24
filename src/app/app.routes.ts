import { Routes } from '@angular/router';
import { HomeComponent } from 'app/components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { inject } from '@angular/core';
import { AuthGuard } from 'app/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

// Routes protected by AuthService/Guard
const protectedRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [() => inject(AuthGuard).CanActivateFn()]},
  { path: 'profile', component: ProfileComponent, canActivate: [() => inject(AuthGuard).CanActivateFn()]}
]

// Routes allowed outside of AuthService/Guard
const unprotectedRoute: Routes = [
]

export const routes: Routes = [
  ...protectedRoutes,
  { path: '**', component: LoginComponent}
];

