import { Component } from '@angular/core';
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
  templateUrl: './game-detail.html',
})
export class GameDetail {}
