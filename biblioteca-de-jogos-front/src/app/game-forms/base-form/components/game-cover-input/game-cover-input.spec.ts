import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameCoverInput } from './game-cover-input';

describe('GameCoverInput', () => {
  let component: GameCoverInput;
  let fixture: ComponentFixture<GameCoverInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCoverInput],
    }).compileComponents();

    fixture = TestBed.createComponent(GameCoverInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
