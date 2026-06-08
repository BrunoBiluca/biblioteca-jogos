import { Component, input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';

export interface SelectorOption {
  icon: string;
  label: string;
  description: string;
  value: any;
}

@Component({
  selector: 'app-selector-grid',
  imports: [NgIconComponent],
  templateUrl: './selector-grid.html',
})
export class SelectorGrid {
  title = input.required();
  name = input.required<string>();
  options = input.required<SelectorOption[]>();
}
