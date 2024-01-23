import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) export class AuthGuard {
  CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.userAuthSubject.pipe(
      map((value) => value),
      catchError(() => {
        router.createUrlTree(['/login']);
        return of(false);
      })
    );
  }
};
