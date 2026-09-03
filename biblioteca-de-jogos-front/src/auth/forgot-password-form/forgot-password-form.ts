import { AuthRoutes } from '@/core/auth/auth-routes';
import { AuthService } from '@/core/auth/auth.service';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HlmFieldImports } from '@/common/ui/field/src';
import { HlmInputImports } from '@/common/ui/input/src';
import { HlmButtonImports } from '@/common/ui/button/src';
import { HlmIconImports } from '@/common/ui/icon/src';

@Component({
  selector: 'app-forgot-password-form',
  imports: [ReactiveFormsModule, HlmFieldImports, HlmInputImports, HlmButtonImports, HlmIconImports],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './forgot-password-form.html',
})
export class ForgotPasswordForm {
  auth = inject(AuthService);
  authRoutes = inject(AuthRoutes);
  router = inject(Router);
  private readonly _fb = inject(FormBuilder);

  public form = this._fb.group(
    {
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

  async changePassword() {
    if (!this.form.valid) return;

    let newPassword = this.form.get('password')!.value!;
    await this.auth.changePassword(newPassword);
    this.router.navigate([this.authRoutes.login]);
  }
}
