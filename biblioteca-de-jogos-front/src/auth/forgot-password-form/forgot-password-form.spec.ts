import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordForm } from './forgot-password-form';
import { AuthService } from '@/core/auth/auth.service';
import { InvalidCredentialsException, UserNotFoundException } from '@/core/auth/auth-exceptions';
import { provideRouter } from '@angular/router';
import { AuthRoutes } from '@/core/auth/auth-routes';

describe('ForgotPasswordForm', () => {
  let component: ForgotPasswordForm;
  let fixture: ComponentFixture<ForgotPasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordForm],
      providers: [
        provideRouter([]),
        {
          provide: AuthRoutes,
          useValue: new AuthRoutes(
            '/login',
            '/signup',
            '/confirm',
            '/logout',
            '/forgot-password',
            '/home',
          ),
        },
        {
          provide: AuthService,
          useValue: {
            signup: vi.fn(),
            confirm: vi.fn(),
            logout: vi.fn(),
            login: vi.fn((email: string, password: string) => {
              if (email !== 'm@example.com') {
                throw new UserNotFoundException();
              }
              if (email === 'm@example.com' && password === 'wrong-password') {
                throw new InvalidCredentialsException();
              }
              return Promise.resolve();
            }),
            getLoggedUser: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
