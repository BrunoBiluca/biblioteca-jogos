import { Routes } from '@angular/router';
import { HomePage } from './home.page/home.page';
import { AuthPage } from '@/auth/auth.page';
import { SignupForm } from '@/auth/signup-form';
import { LoginForm } from '@/auth/login-form';

export const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
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
    component: HomePage,
  },
];
