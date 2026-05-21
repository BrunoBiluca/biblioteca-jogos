import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSummary } from './player-summary';

describe('PlayerSummary', () => {
  let component: PlayerSummary;
  let fixture: ComponentFixture<PlayerSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
