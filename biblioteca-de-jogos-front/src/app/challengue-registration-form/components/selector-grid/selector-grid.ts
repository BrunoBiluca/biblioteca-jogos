import { CommonModule } from '@angular/common';
import { Component, input, linkedSignal, output } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';

export interface SelectorOption {
  icon: string;
  label: string;
  description: string;
  value: any;
}

@Component({
  selector: 'app-selector-grid',
  imports: [NgIconComponent, CommonModule],
  templateUrl: './selector-grid.html',
})
export class SelectorGrid {
  title = input.required();
  name = input.required<string>();
  options = input.required<SelectorOption[]>();

  selectedOption = linkedSignal(() => this.options()[0].value);
  onChange = output<any>();

  updateOption(value: any) {
    this.selectedOption.set(value);
    this.onChange.emit(value);
  }
}
