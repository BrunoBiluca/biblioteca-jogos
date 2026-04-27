import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideGalleryVerticalEnd } from '@ng-icons/lucide';
import { HlmButtonImports } from '@ui/button';
import { HlmFieldImports } from '@ui/field';
import { HlmIconImports } from '@ui/icon';
import { HlmInputImports } from '@ui/input';

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

  public form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public login() {
    if (this.form.valid) {
      // login logic here
      console.log(this.form.value);
    }
  }
}
