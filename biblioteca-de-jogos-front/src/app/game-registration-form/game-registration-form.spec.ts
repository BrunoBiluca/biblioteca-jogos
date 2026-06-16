import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRegistrationForm } from './game-registration-form';

describe('GameRegistrationForm', () => {
  let component: GameRegistrationForm;
  let fixture: ComponentFixture<GameRegistrationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRegistrationForm],
    }).compileComponents();

    fixture = TestBed.createComponent(GameRegistrationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
