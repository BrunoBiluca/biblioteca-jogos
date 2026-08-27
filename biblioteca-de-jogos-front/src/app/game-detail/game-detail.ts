import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCirclePlus, lucideEdit } from '@ng-icons/lucide';

@Component({
  selector: 'app-game-detail',
  imports: [NgIconComponent],
  providers: [
    provideIcons({
      lucideEdit,
      lucideCirclePlus,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './game-detail.html',
})
export class GameDetail {}
