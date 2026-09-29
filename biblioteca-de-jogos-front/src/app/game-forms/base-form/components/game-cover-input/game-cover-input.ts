import { validateImageRatio } from '@common/forms/validators/image-validator';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  imports: [CommonModule, NgIconComponent],
  selector: 'app-game-cover-input',
  templateUrl: './game-cover-input.html',
})
export class GameCoverInput implements OnInit {
  initialCover = input.required<File | null>();
  onCoverSelected = output<File>();

  cover = signal<File | null>(null);
  coverError = signal<string | null>(null);
  coverPreview = computed(() =>
    this.cover()
      ? URL.createObjectURL(this.cover()!)
      : 'assets/generic-racing-game.png',
  );

  ngOnInit(): void {
    this.cover.set(this.initialCover());
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
    this.onCoverSelected.emit(file);
  }
}
