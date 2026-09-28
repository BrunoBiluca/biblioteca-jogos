import { validateImageRatio } from '@/common/forms/validators/image-validator';
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
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideCheck,
  lucideImage,
  lucideLoader,
  lucidePlusCircle,
  lucideText,
} from '@ng-icons/lucide';

@Component({
  imports: [
    ReactiveFormsModule,
    NgIconComponent,
    HlmAutocompleteImports,
    CommonModule,
    HlmFieldImports,
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
  coverError = signal<string | null>(null);
  coverPreview = computed(() =>
    this.cover()
      ? URL.createObjectURL(this.cover()!)
      : 'assets/generic-racing-game.png',
  );

  readonly developerSearch = signal('');
  readonly selectedDeveloper = signal('');

  allGenres = computed(() => this.gameStore.allGenres() || []);
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

  isGenreSelected(genre: string) {
    return this.selectedGenres().includes(genre);
  }

  toggleGenre(genre: string) {
    if (this.isGenreSelected(genre)) {
      this.selectedGenres.update((genres) => genres.filter((g) => g !== genre));
    } else {
      this.selectedGenres.update((genres) => [...genres, genre]);
    }
    this.form().get('genres')!.setValue(this.selectedGenres());
  }

  async onCoverChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!(await validateImageRatio(file, ['2:3', '3:4', '3:5'], 0.1))) {
      this.coverError.set(
        'Arte da capa deve ter uma proporção de 3:4 ou 3:5 (ex. 300x400 pixels).',
      );
      return;
    }

    this.coverError.set(null);
    this.cover.set(file);
  }
}
