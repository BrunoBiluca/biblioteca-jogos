import { AuthRoutes } from '@core/auth/auth-routes';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideGalleryVerticalEnd } from '@ng-icons/lucide';
import { HlmButtonImports } from '@ui/button';
import { HlmFieldImports } from '@ui/field';
import { HlmIconImports } from '@ui/icon';
import { HlmInputImports } from '@ui/input';
import { AuthService } from '@/core/auth/auth.service';

@Component({
  selector: 'login-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    HlmFieldImports,
    HlmInputImports,
    HlmButtonImports,
    HlmIconImports,
  ],
  providers: [provideIcons({ lucideGalleryVerticalEnd })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'login-form.html',
  standalone: true,
})
export class LoginForm {
  private readonly _fb = inject(FormBuilder);
  auth = inject(AuthService);
  authRoutes = inject(AuthRoutes);
  router = inject(Router);

  public form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async login() {
    if (this.form.invalid) return;

    try {
      let email = this.form.get('email')!.value!;
      let password = this.form.get('password')!.value!;
      await this.auth.login(email, password);
      this.router.navigate([this.authRoutes.afterLogin]);
    } catch (error) {
      this.form.setErrors({ loginError: error });
    }
  }
}
