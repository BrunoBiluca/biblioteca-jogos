import { GameStore } from '@/core/game/game.store';
import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  computed,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCirclePlus, lucideEdit } from '@ng-icons/lucide';

@Component({
  selector: 'app-game-detail',
  imports: [NgIconComponent, CommonModule],
  providers: [
    provideIcons({
      lucideEdit,
      lucideCirclePlus,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './game-detail.html',
})
export class GameDetail implements OnInit {
  gameStore = inject(GameStore);
  activeRoute = inject(ActivatedRoute);

  game = computed(() => this.gameStore.currentGame());

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      console.log('GameDetail params:', params);
      const gameId = params['gameId'];
      this.gameStore.getGameById({ gameId });
    });
  }
}
