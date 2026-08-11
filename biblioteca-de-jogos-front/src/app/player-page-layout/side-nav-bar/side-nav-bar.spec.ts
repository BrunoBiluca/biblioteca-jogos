import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavBar } from './side-nav-bar';
import { provideRouter } from '@angular/router';
import { provideAuthMock } from '@/testing/mocks/auth.mock';

describe('SideNavBar', () => {
  let component: SideNavBar;
  let fixture: ComponentFixture<SideNavBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavBar],
      providers: [provideRouter([]), provideAuthMock()],
    }).compileComponents();

    fixture = TestBed.createComponent(SideNavBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
