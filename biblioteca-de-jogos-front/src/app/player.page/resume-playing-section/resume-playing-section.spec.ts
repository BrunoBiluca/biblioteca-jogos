import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumePlayingSection } from './resume-playing-section';

describe('ResumePlayingSection', () => {
  let component: ResumePlayingSection;
  let fixture: ComponentFixture<ResumePlayingSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumePlayingSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumePlayingSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
