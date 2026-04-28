import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideGalleryVerticalEnd } from '@ng-icons/lucide';
import { HlmIconImports } from '@ui/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'auth-page',
  imports: [RouterOutlet, RouterLink, HlmIconImports, CommonModule],
  providers: [provideIcons({ lucideGalleryVerticalEnd })],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
  templateUrl: 'auth.page.html',
})
export class AuthPage {}
