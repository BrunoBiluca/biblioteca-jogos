import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCatalog } from './game-catalog';
import { provideRouter } from '@angular/router';
import { provideGameServiceMock } from '@/testing/mocks/game.service.mock';

describe('GameCatalog', () => {
  let component: GameCatalog;
  let fixture: ComponentFixture<GameCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCatalog],
      providers: [provideRouter([]), provideGameServiceMock()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameCatalog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
