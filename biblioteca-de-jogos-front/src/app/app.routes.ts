import { Routes } from '@angular/router';
import { PlayerPageLayout } from './player-page-layout/player-page-layout';
import { AuthPage } from '@/auth/auth.page';
import { SignupForm } from '@/auth/signup-form';
import { LoginForm } from '@/auth/login-form';
import { PlayerSummary } from './player-summary/player-summary';
import { PlayerLibrary } from './player-library/player-library';
import { ChallengueRegistrationForm } from './challengue-registration-form/challengue-registration-form';
import { GameDetail } from './game-detail/game-detail';

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
    component: PlayerPageLayout,
    children: [
      { path: '', component: PlayerSummary },
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
    ], // Assuming PlayerSummary is the component for the child route
  },
];
