import { HlmAutocompleteImports } from '@/common/ui/autocomplete/src';
import { HlmFieldImports } from '@/common/ui/field/src';
import { GameStore } from '@/core/game/game.store';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  debounced,
  effect,
  inject,
  input,
  OnInit,
  output,
  resource,
  signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideCheck,
  lucideImage,
  lucideLoader,
  lucidePlusCircle,
  lucideText,
} from '@ng-icons/lucide';
import { GameTagsInput } from './components/game-tags-input/game-tags-input';
import { GameCoverInput } from './components/game-cover-input/game-cover-input';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule,
    NgIconComponent,
    HlmAutocompleteImports,
    CommonModule,
    HlmFieldImports,
    GameTagsInput,
    GameCoverInput,
    RouterLink,
  ],
  providers: [
    provideIcons({
      lucideText,
      lucidePlusCircle,
      lucideImage,
      lucideCheck,
      lucideLoader,
    }),
  ],
  selector: 'app-base-form',
  templateUrl: './base-form.html',
})
export class BaseForm implements OnInit {
  form = input.required<FormGroup>();
  submitButtonLabel = input.required<string>();
  formTitle = input.required<string>();
  onSubmit = output<void>();

  gameStore = inject(GameStore);

  cover = signal<File | null>(null);

  readonly developerSearch = signal('');
  readonly selectedDeveloper = signal('');

  selectedGenres = signal<string[]>([]);

  constructor() {
    effect(() => {
      this.form().get('developer')?.setValue(this.selectedDeveloper());
    });

    effect(() => {
      this.form().get('cover')?.setValue(this.cover());
    });
  }

  ngOnInit(): void {
    this.developerSearch.set(this.form().get('developer')?.value ?? '');
    this.selectedDeveloper.set(this.form().get('developer')?.value ?? '');
    this.selectedGenres.set(this.form().get('genres')?.value ?? []);
    this.cover.set(this.form().get('cover')?.value ?? null);
  }

  debouncedSearch = debounced(this.developerSearch, 300);
  developerOptions = resource({
    defaultValue: [],
    params: () => ({ search: this.debouncedSearch.value() }),
    loader: async ({ params }) => {
      const search = params.search;

      if (search.length === 0) {
        return [];
      }

      return this.gameStore
        .allDevelopers()!
        .filter((d) => d.toLowerCase().includes(search.toLowerCase()));
    },
  });

  toggleGenres(genres: string[]) {
    this.form().get('genres')!.setValue(genres);
  }

  selectCover(cover: File) {
    this.cover.set(cover);
  }
}
