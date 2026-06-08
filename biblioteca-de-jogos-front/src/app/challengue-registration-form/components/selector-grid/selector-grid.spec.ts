import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorGrid } from './selector-grid';

describe('SelectorGrid', () => {
  let component: SelectorGrid;
  let fixture: ComponentFixture<SelectorGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
