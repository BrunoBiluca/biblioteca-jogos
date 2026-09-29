import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CurrentlyPlayingSection } from './currently-playing-section/currently-playing-section';
import { PlayingNextSection } from './playing-next-section/playing-next-section';
import { ResumePlayingSection } from './resume-playing-section/resume-playing-section';

@Component({
  selector: 'app-player-summary',
  imports: [CurrentlyPlayingSection, PlayingNextSection, ResumePlayingSection],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './player-summary.html',
})
export class PlayerSummary {}
