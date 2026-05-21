import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucidePlay } from '@ng-icons/lucide';

@Component({
  selector: 'resume-playing-section',
  imports: [NgIconComponent],
  providers: [
    provideIcons({
      lucidePlay,
    }),
  ],
  templateUrl: './resume-playing-section.html',
})
export class ResumePlayingSection {}
