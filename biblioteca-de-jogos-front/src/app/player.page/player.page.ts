import { Component } from '@angular/core';
import { SideNavBar } from './side-nav-bar/side-nav-bar';
import { CurrentlyPlayingSection } from './currently-playing-section/currently-playing-section';
import { PlayingNextSection } from './playing-next-section/playing-next-section';
import { ResumePlayingSection } from './resume-playing-section/resume-playing-section';
import { AppHeader } from './app-header/app-header';

@Component({
  selector: 'player-page',
  imports: [
    SideNavBar,
    CurrentlyPlayingSection,
    PlayingNextSection,
    ResumePlayingSection,
    AppHeader,
  ],
  templateUrl: './player.page.html',
})
export class PlayerPage {}
