import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-nav-item',
  imports: [NgIconComponent],
  template: `
    <a
      class="flex items-center gap-3 py-3 px-6 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50 hover:pl-10 transition-all duration-300"
      [class.active]="isActive(href())"
      [href]="href()"
    >
      <ng-icon name="{{ icon() }}" class="text-xl" />
      {{ label() }}
    </a>
  `,
  styles: [
    `
      .active {
        color: var(--primary);
        background-color: var(--zinc-900);
        border-right-width: 4px;
        border-color: var(--primary);
        box-shadow: inset -10px 0 20px rgba(0, 240, 255, 0.1);
      }
    `,
  ],
})
export class NavItemComponent {
  href = input.required<string>();
  icon = input.required<any>();
  label = input.required<string>();

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
