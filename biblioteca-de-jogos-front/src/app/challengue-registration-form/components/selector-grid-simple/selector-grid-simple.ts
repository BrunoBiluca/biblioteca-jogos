import { CommonModule } from '@angular/common';
import { Component, input, linkedSignal, output, ChangeDetectionStrategy } from '@angular/core';

export interface SelectorOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-selector-grid-simple',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './selector-grid-simple.html',
})
export class SelectorGridSimple {
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
