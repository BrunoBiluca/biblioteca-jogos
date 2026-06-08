import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorGridSimple } from './selector-grid-simple';

describe('SelectorGridSimple', () => {
  let component: SelectorGridSimple;
  let fixture: ComponentFixture<SelectorGridSimple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorGridSimple],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorGridSimple);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
