import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthRoutes } from './auth-routes';

export const protectedRoute: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const authRoutes = inject(AuthRoutes);
  const router = inject(Router);

  const user = await authService.getLoggedUser();

  if (user === null) {
    return router.parseUrl(authRoutes.login);
  }
  return true;
};

export const bypassAuth: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const authRoutes = inject(AuthRoutes);
  const router = inject(Router);

  const user = await authService.getLoggedUser();

  if (user !== null) {
    return router.parseUrl(authRoutes.afterLogin);
  }
  return true;
};
