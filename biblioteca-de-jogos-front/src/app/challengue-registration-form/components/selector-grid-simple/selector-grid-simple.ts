import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

export interface SelectorOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-selector-grid-simple',
  imports: [CommonModule],
  templateUrl: './selector-grid-simple.html',
})
export class SelectorGridSimple {
  title = input.required();
  name = input.required<string>();
  options = input.required<SelectorOption[]>();
}
