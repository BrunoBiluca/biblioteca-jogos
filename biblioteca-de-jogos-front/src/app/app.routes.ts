import { Routes } from '@angular/router';
import { PlayerPageLayout } from './player-page-layout/player-page-layout';
import { AuthPage } from '@/auth/auth-page-layout/auth.page';
import { SignupForm } from '@/auth/signup-form/signup-form';
import { LoginForm } from '@/auth/login-form/login-form';
import { PlayerSummary } from './player-summary/player-summary';
import { PlayerLibrary } from './player-library/player-library';
import { ChallengueRegistrationForm } from './challengue-registration-form/challengue-registration-form';
import { GameDetail } from './game-detail/game-detail';
import { GameRegistrationForm } from './game-registration-form/game-registration-form';
import { GameCatalog } from './game-catalog/game-catalog';
import { bypassAuth, protectedRoute as protectedRoute } from '@/core/auth/auth.guard';
import { ForgotPasswordForm } from '@/auth/forgot-password-form/forgot-password-form';

export const routes: Routes = [
  {
    path: '',
    canActivate: [bypassAuth],
    component: AuthPage,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginForm,
      },
      {
        path: 'signup',
        component: SignupForm,
      },
    ],
  },
  {
    path: 'forgot-password',
    canActivate: [protectedRoute],
    component: AuthPage,
    children: [
      {
        path: '',
        component: ForgotPasswordForm,
      },
    ],
  },
  {
    path: 'player',
    canActivate: [protectedRoute],
    component: PlayerPageLayout,
    children: [
      { path: '', component: PlayerSummary },
      {
        path: 'games/new',
        component: GameRegistrationForm,
      },
      {
        path: 'games',
        component: PlayerLibrary,
      },
      {
        path: 'games/:gameId',
        component: GameDetail,
      },
      {
        path: 'challenges/new',
        component: ChallengueRegistrationForm,
      },
      {
        path: 'catalog',
        component: GameCatalog,
      },
    ], // Assuming PlayerSummary is the component for the child route
  },
];
