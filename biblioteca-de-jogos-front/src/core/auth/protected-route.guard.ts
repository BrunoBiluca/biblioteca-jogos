import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthRoutes } from './auth-routes';

export const protectedRouteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const authRoutes = inject(AuthRoutes);
  const _router = inject(Router);
  if (!authService.getLoggedUser()) {
    return _router.parseUrl(authRoutes.login);
  }
  return true;
};
