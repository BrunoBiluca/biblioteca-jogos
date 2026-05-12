import { PROJECT_CONFIG_TOKEN } from '@/project.config';
import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideGamepad2,
  lucideHistory,
  lucideHouse,
  lucidePlusCircle,
  lucideSwords,
} from '@ng-icons/lucide';

@Component({
  selector: 'player-page',
  imports: [NgIconComponent],
  providers: [
    provideIcons({ lucideHouse, lucideGamepad2, lucideSwords, lucideHistory, lucidePlusCircle }),
  ],
  templateUrl: './player.page.html',
})
export class PlayerPage {
  projectConfig = inject(PROJECT_CONFIG_TOKEN);
}
