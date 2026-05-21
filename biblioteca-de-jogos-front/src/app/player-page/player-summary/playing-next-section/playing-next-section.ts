import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucidePlusCircle } from '@ng-icons/lucide';

@Component({
  selector: 'playing-next-section',
  imports: [NgIconComponent],
  providers: [
    provideIcons({
      lucidePlusCircle,
    }),
  ],
  templateUrl: './playing-next-section.html',
})
export class PlayingNextSection {}
