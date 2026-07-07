import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HlmButtonImports } from '@ui/button';
import { HlmFieldImports } from '@ui/field';
import { HlmInputImports } from '@ui/input';
import { HlmIconImports } from '@ui/icon';
import { AuthService } from '@/core/auth/auth.service';
import { AuthRoutes } from '@/core/auth/auth-routes';

@Component({
  selector: 'spartan-two-column-signup-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    HlmFieldImports,
    HlmInputImports,
    HlmButtonImports,
    HlmIconImports,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'signup-form.html',
})
export class SignupForm {
  auth = inject(AuthService);
  authRoutes = inject(AuthRoutes);
  router = inject(Router);
  private readonly _fb = inject(FormBuilder);

  public form = this._fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: (group: AbstractControl): ValidationErrors | null => {
        const password = group.get('password')?.value;
        const confirm = group.get('confirmPassword')?.value;
        return password === confirm ? null : { passwordMismatch: true };
      },
    },
  );

  public signup() {
    if (!this.form.valid) return;

    this.auth.signup(
      this.form.get('email')!.value!,
      this.form.get('password')!.value!,
      this.form.get('name')!.value!,
    );

    this.router.navigate([this.authRoutes.login]);
  }
}
