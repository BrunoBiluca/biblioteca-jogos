import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengueRegistrationForm } from './challengue-registration-form';

describe('ChallengueRegistrationForm', () => {
  let component: ChallengueRegistrationForm;
  let fixture: ComponentFixture<ChallengueRegistrationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengueRegistrationForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengueRegistrationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
