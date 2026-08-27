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

  it('should render form fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const nameInput = compiled.querySelector('input#name') as HTMLInputElement;
    const devInput = compiled.querySelector('#developer') as HTMLInputElement;
    const yearInput = compiled.querySelector('input#releaseYear') as HTMLInputElement;
    const genreInput = compiled.querySelector('#genres') as HTMLInputElement;
    const coverInput = compiled.querySelector('input#cover') as HTMLInputElement;

    expect(nameInput).toBeTruthy();
    expect(devInput).toBeTruthy();
    expect(yearInput).toBeTruthy();
    expect(genreInput).toBeTruthy();
    expect(coverInput).toBeTruthy();
  });
});
