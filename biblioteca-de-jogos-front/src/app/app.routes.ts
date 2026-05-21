import { Routes } from '@angular/router';
import { PlayerPage } from './player-page/player-page';
import { AuthPage } from '@/auth/auth.page';
import { SignupForm } from '@/auth/signup-form';
import { LoginForm } from '@/auth/login-form';
import { PlayerSummary } from './player-page/player-summary/player-summary';
import { PlayerLibrary } from './player-page/player-library/player-library';

export const routes: Routes = [
  {
    path: '',
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
    path: 'player',
    component: PlayerPage,
    children: [
      { path: '', component: PlayerSummary },
      {
        path: 'games',
        component: PlayerLibrary,
      },
    ], // Assuming PlayerSummary is the component for the child route
  },
];
