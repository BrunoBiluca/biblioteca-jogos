import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideHouse,
  lucideGamepad2,
  lucideSwords,
  lucideHistory,
  lucidePlusCircle,
  lucideLogOut,
  lucideHelpCircle,
} from '@ng-icons/lucide';
import { NavItemComponent } from './components/nav-item';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@/core/auth/auth.service';
import { AuthRoutes } from '@/core/auth/auth-routes';

@Component({
  selector: 'side-nav-bar',
  imports: [NgIconComponent, NavItemComponent, RouterLink],
  providers: [
    provideIcons({
      lucideHouse,
      lucideGamepad2,
      lucideSwords,
      lucideHistory,
      lucidePlusCircle,
      lucideLogOut,
      lucideHelpCircle,
    }),
  ],
  templateUrl: './side-nav-bar.html',
})
export class SideNavBar {
  auth = inject(AuthService);
  authRoutes = inject(AuthRoutes);
  router = inject(Router);

  async logout() {
    await this.auth.logout();
    this.router.navigate([this.authRoutes.login]);
  }
}
