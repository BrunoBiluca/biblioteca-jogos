import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideGalleryVerticalEnd } from '@ng-icons/lucide';
import { LoginForm } from './login-form';
import { HlmIconImports } from '@ui/icon';
import { SignupForm } from './signup-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'auth-page',
  imports: [RouterOutlet, RouterLink, LoginForm, HlmIconImports, SignupForm, CommonModule],
  providers: [provideIcons({ lucideGalleryVerticalEnd })],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
  templateUrl: 'auth.page.html',
})
export class AuthPage {}
