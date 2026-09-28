import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameTagsInput } from './game-tags-input';

describe('GameTagsInput', () => {
  let component: GameTagsInput;
  let fixture: ComponentFixture<GameTagsInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTagsInput],
    }).compileComponents();

    fixture = TestBed.createComponent(GameTagsInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
