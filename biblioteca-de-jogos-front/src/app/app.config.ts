import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from '@/core/auth/auth.service';
import { StandaloneAuthService } from '@/testing/services/standalone-auth-service';
import { AuthRoutes } from '@/core/auth/auth-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: AuthService, useClass: StandaloneAuthService },
    {
      provide: AuthRoutes,
      useValue: new AuthRoutes(
        '/login',
        '/signup',
        '/confirm',
        '/logout',
        '/forgot-password',
        '/player',
      ),
    },
  ],
};
