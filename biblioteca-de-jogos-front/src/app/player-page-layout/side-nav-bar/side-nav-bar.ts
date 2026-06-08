import { Component } from '@angular/core';
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

@Component({
  selector: 'side-nav-bar',
  imports: [NgIconComponent, NavItemComponent],
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
export class SideNavBar {}
