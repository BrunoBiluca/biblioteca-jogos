import { validateImageRatio } from '@/common/forms/validators/image-validator';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  resource,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmFieldImports } from '@/common/ui/field/src';
import { HlmAutocompleteImports } from '@/common/ui/autocomplete/src';
import { GameStore } from '@/core/game/game.store';
import { Router } from '@angular/router';
import { BaseForm } from '../base-form/base-form';

@Component({
  selector: 'app-game-registration-form',
  imports: [
    ReactiveFormsModule,
    HlmAutocompleteImports,
    CommonModule,
    HlmFieldImports,
    BaseForm,
  ],
  templateUrl: './registration.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class GameRegistrationForm {
  gameStore = inject(GameStore);
  private router = inject(Router);
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    name: ['', [Validators.required]],
    developer: ['', [Validators.required]],
    genres: new FormControl<string[]>([], [Validators.required]),
    releaseYear: [
      null,
      [
        Validators.required,
        Validators.min(1954),
        Validators.max(new Date().getFullYear()),
      ],
    ],
    cover: [null, [Validators.required]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const name = this.form.get('name')!.value!;
    const developer = this.form.get('developer')!.value!;
    const genres = this.form.get('genres')!.value!;
    const releaseYear = this.form.get('releaseYear')!.value!;
    const cover = this.form.get('cover')!.value!;

    this.gameStore.createGame({
      game: { name, developer, genres, releaseYear },
      coverFile: cover,
    });

    this.form.reset();
    this.router.navigate(['/player/catalog']);
  }
}
