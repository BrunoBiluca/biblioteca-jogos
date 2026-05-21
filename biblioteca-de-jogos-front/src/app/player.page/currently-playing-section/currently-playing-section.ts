import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideTrash, lucidePause, lucidePlay } from '@ng-icons/lucide';

@Component({
  selector: 'currently-playing-section',
  imports: [NgIconComponent],
  providers: [
    provideIcons({
      lucideTrash,
      lucidePause,
      lucidePlay,
    }),
  ],
  templateUrl: './currently-playing-section.html',
})
export class CurrentlyPlayingSection {}
