import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCatalog } from './game-catalog';

describe('GameCatalog', () => {
  let component: GameCatalog;
  let fixture: ComponentFixture<GameCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCatalog],
    }).compileComponents();

    fixture = TestBed.createComponent(GameCatalog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
