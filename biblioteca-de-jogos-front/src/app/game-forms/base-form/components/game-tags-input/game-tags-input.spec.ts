import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameTagsInput } from './game-tags-input';
import { provideGameServiceMock } from '@/testing/mocks/game.service.mock';

describe('GameTagsInput', () => {
  let component: GameTagsInput;
  let fixture: ComponentFixture<GameTagsInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTagsInput],
      providers: [provideGameServiceMock()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameTagsInput);
    fixture.componentRef.setInput('initialGenres', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
