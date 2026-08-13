import { vi } from 'vitest';
import { AuthRoutes } from '@/core/auth/auth-routes';
import { AuthService } from '@/core/auth/auth.service';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

export function provideAuthMock(): EnvironmentProviders {
  let authService: AuthService = {
    signup: vi.fn(),
    logout: vi.fn(),
    login: vi.fn(),
    getLoggedUser: vi.fn(),
  };

  let authRoutes = new AuthRoutes(
    '/login',
    '/signup',
    '/confirm',
    '/logout',
    '/forgot-password',
    '/home',
  );

  return makeEnvironmentProviders([
    {
      provide: AuthRoutes,
      useValue: authRoutes,
    },
    {
      provide: AuthService,
      useValue: authService,
    },
  ]);
}
