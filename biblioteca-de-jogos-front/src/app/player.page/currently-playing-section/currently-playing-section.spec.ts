import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlyPlayingSection } from './currently-playing-section';

describe('CurrentlyPlayingSection', () => {
  let component: CurrentlyPlayingSection;
  let fixture: ComponentFixture<CurrentlyPlayingSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentlyPlayingSection],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentlyPlayingSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
