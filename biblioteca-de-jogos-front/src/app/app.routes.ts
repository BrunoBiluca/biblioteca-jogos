import { Routes } from '@angular/router';
import { PlayerPage } from './player.page/player.page';
import { AuthPage } from '@/auth/auth.page';
import { SignupForm } from '@/auth/signup-form';
import { LoginForm } from '@/auth/login-form';

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
  },
];
