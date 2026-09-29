import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SideNavBar } from '@/app/player-page-layout/side-nav-bar/side-nav-bar';
import { AppHeader } from '@/app/player-page-layout/app-header/app-header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'player-page',
  imports: [SideNavBar, AppHeader, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './player-page-layout.html',
})
export class PlayerPageLayout {}
