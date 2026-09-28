import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { BaseForm } from '../base-form/base-form';
import { GameStore } from '@/core/game/game.store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  imports: [BaseForm],
  selector: 'app-edit',
  templateUrl: './edit.html',
})
export class Edit implements OnInit {
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);

  readonly _fb = inject(FormBuilder);
  form = signal<FormGroup | undefined>(undefined);

  gameStore = inject(GameStore);
  game = computed(() => this.gameStore.currentGame());

  constructor() {
    effect(() => {
      if (!this.game()) return;
      this.buildForm();
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.gameStore.getGameById({ gameId: params['gameId'] });
    });
  }

  buildForm() {
    let game = this.game()!;
    this.form.set(
      this._fb.group({
        name: [game.name, [Validators.required]],
        developer: [game.developer, [Validators.required]],
        genres: new FormControl<string[]>(game.genres, [Validators.required]),
        releaseYear: [
          game.releaseYear,
          [
            Validators.required,
            Validators.min(1954),
            Validators.max(new Date().getFullYear()),
          ],
        ],
        cover: [game.coverFile, [Validators.required]],
      }),
    );
  }

  submit() {
    let form = this.form()!;
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const name = form.get('name')!.value!;
    const developer = form.get('developer')!.value!;
    const genres = form.get('genres')!.value!;
    const releaseYear = form.get('releaseYear')!.value!;
    const cover = form.get('cover')!.value!;

    this.gameStore.updateGame({
      id: this.game()!.id,
      changes: { name, developer, genres, releaseYear },
      coverFile: cover,
    });

    form.reset();
    this.router.navigate(['/player/games/', this.game()!.id]);
  }

  deleteGame() {
    this.gameStore.deleteGame(this.game()!.id);
    this.router.navigate(['/player/catalog']);
  }
}

export const GameEditForm = Edit;
