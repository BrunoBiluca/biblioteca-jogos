import { PROJECT_CONFIG_TOKEN } from '@/project.config';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './app-header.html',
})
export class AppHeader {
  projectConfig = inject(PROJECT_CONFIG_TOKEN);
}
