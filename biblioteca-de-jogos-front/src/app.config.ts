import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app/app.routes';
import { AuthService } from '@/core/auth/auth.service';
import { StandaloneAuthService } from '@/testing/services/standalone-auth.service';
import { AuthRoutes } from '@/core/auth/auth-routes';
import { environment } from './environment';
import { SupabaseAuth } from './integrations/supabase/supabase-auth';
import { GameService } from './core/game/game.service';
import { StandaloneGameService } from './testing/services/standalone-game.service';
import { SupabaseGameService } from './integrations/supabase/supabase-game.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: AuthService,
      useClass:
        environment.env == 'standalone' ? StandaloneAuthService : SupabaseAuth,
    },
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
    {
      provide: GameService,
      useClass:
        environment.env == 'standalone'
          ? StandaloneGameService
          : SupabaseGameService,
    },
  ],
};
