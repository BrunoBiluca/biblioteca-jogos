import { AuthRoutes } from '@core/auth/auth-routes';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideGalleryVerticalEnd, lucideSend, lucideX } from '@ng-icons/lucide';
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
  providers: [provideIcons({ lucideGalleryVerticalEnd, lucideX, lucideSend })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'login-form.html',
  standalone: true,
})
export class LoginForm {
  private readonly _fb = inject(FormBuilder);
  auth = inject(AuthService);
  authRoutes = inject(AuthRoutes);
  router = inject(Router);
  didResetPassword = signal<boolean>(false);

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

  async forgotPassword() {
    let emailField = this.form.get('email')!;
    let email = emailField.value;

    if (email == null || email == '') {
      emailField.markAsTouched();
      return;
    }

    await this.auth.resetPassword(email!);
    this.didResetPassword.set(true);
  }

  closeNotification() {
    this.didResetPassword.set(false);
  }
}
