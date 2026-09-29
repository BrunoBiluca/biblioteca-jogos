import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Edit } from './edit';
import { provideRouter } from '@angular/router';
import { provideGameServiceMock } from '@/testing/mocks/game.service.mock';

describe('Edit', () => {
  let component: Edit;
  let fixture: ComponentFixture<Edit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Edit],
      providers: [provideRouter([]), provideGameServiceMock()],
    }).compileComponents();

    fixture = TestBed.createComponent(Edit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
