import { Component, ChangeDetectionStrategy } from '@angular/core';
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
export class GameCatalog {}
