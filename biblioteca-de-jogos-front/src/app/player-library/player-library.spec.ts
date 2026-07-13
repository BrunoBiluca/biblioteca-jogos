import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLibrary } from './player-library';
import { provideRouter } from '@angular/router';

describe('PlayerLibrary', () => {
  let component: PlayerLibrary;
  let fixture: ComponentFixture<PlayerLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerLibrary],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
