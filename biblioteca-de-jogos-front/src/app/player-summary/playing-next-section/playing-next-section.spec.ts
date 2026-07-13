import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingNextSection } from './playing-next-section';
import { provideRouter } from '@angular/router';

describe('PlayingNextSection', () => {
  let component: PlayingNextSection;
  let fixture: ComponentFixture<PlayingNextSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayingNextSection],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayingNextSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
