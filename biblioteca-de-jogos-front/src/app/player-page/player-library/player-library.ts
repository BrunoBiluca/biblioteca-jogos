import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';

@Component({
  selector: 'app-player-library',
  imports: [NgIconComponent],
  providers: [
    provideIcons({
      lucideSearch,
    }),
  ],
  templateUrl: './player-library.html',
})
export class PlayerLibrary {}
