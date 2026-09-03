import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameDetail } from './game-detail';
import { provideGameStoreMock } from '@/testing/mocks/game.store.mock';
import { provideRouter } from '@angular/router';

describe('GameDetail', () => {
  let component: GameDetail;
  let fixture: ComponentFixture<GameDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetail],
      providers: [provideRouter([]), provideGameStoreMock()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
