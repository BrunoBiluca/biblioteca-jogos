import { Component } from '@angular/core';
import { SideNavBar } from '@app/side-nav-bar/side-nav-bar';
import { AppHeader } from '@app/app-header/app-header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'player-page',
  imports: [SideNavBar, AppHeader, RouterOutlet],
  templateUrl: './player-page.html',
})
export class PlayerPage {}
