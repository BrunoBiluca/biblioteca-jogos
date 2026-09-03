import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';

@Component({
  selector: 'app-player-library',
  imports: [NgIconComponent, RouterLink],
  providers: [
    provideIcons({
      lucideSearch,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './player-library.html',
})
export class PlayerLibrary {}
