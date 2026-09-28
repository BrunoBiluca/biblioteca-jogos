import { GameStore } from '@/core/game/game.store';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, output, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucidePlusCircle, lucideX } from '@ng-icons/lucide';

@Component({
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({
      lucidePlusCircle,
      lucideX,
      lucideCheck,
    }),
  ],
  selector: 'app-game-tags-input',
  templateUrl: './game-tags-input.html',
})
export class GameTagsInput {
  onToggleGenres = output<string[]>();

  gameStore = inject(GameStore);
  initGenres = computed(() => this.gameStore.allGenres() || []);
  allGenres = computed(() => [...this.initGenres(), ...this.newGenrs()]);
  newGenrs = signal<string[]>([]);
  selectedGenres = signal<string[]>([]);

  isAddingTag = signal(false);
  newTag = signal('');
  newTagError = signal<boolean>(false);

  isGenreSelected(genre: string) {
    return this.selectedGenres().includes(genre);
  }

  toggleGenre(genre: string) {
    if (this.isGenreSelected(genre)) {
      this.selectedGenres.update((genres) => genres.filter((g) => g !== genre));
    } else {
      this.selectedGenres.update((genres) => [...genres, genre]);
    }
    this.onToggleGenres.emit(this.selectedGenres());
  }

  addTag() {
    if (!this.newTag()) {
      this.newTagError.set(true);
      return;
    }

    this.newGenrs.update((genres) => [...genres, this.newTag()]);
    this.toggleGenre(this.newTag());
    this.isAddingTag.set(false);
    this.newTag.set('');
    this.newTagError.set(false);
  }

  cancelAddingTag() {
    this.isAddingTag.set(false);
    this.newTag.set('');
    this.newTagError.set(false);
  }
}
