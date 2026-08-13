import { PROJECT_CONFIG_TOKEN } from '@/project.config';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './app-header.html',
})
export class AppHeader {
  projectConfig = inject(PROJECT_CONFIG_TOKEN);

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
