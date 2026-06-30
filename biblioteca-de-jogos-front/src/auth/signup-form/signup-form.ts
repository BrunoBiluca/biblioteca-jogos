import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '@ui/button';
import { HlmFieldImports } from '@ui/field';
import { HlmInputImports } from '@ui/input';
import { HlmIconImports } from '@ui/icon';

@Component({
  selector: 'spartan-two-column-signup-form',
  imports: [ReactiveFormsModule, RouterLink, HlmFieldImports, HlmInputImports, HlmButtonImports, HlmIconImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'signup-form.html',
})
export class SignupForm {
  private readonly _fb = inject(FormBuilder);

  public form = this._fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatch() },
  );

  public signup() {
    if (this.form.valid) {
      // signup logic here
      console.log(this.form.value);
    }
  }
}

function passwordMatch(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  };
}
