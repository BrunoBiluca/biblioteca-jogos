import { GameStore } from '@/core/game/game.store';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';

@Component({
  selector: 'app-game-catalog',
  imports: [NgIconComponent, RouterLink],
  providers: [
    provideIcons({
      lucideSearch,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './game-catalog.html',
})
export class GameCatalog implements OnInit {
  readonly gameStore = inject(GameStore);

  ngOnInit(): void {
    this.gameStore.retryLoadGames();
  }

  updateToFallback(event: Event) {
    const element = event.target as HTMLInputElement;
    element.src = 'assets/game_cover_placeholder.svg';
  }
}
