import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPageLayout } from './player-page-layout';
import { provideRouter } from '@angular/router';
import { provideAuthMock } from '@testing/mocks/auth.mock';

describe('AppHeader', () => {
  let component: PlayerPageLayout;
  let fixture: ComponentFixture<PlayerPageLayout>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerPageLayout],
      providers: [provideRouter([]), provideAuthMock()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerPageLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
