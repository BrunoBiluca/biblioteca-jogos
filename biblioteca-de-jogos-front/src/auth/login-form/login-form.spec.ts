import { TestBed } from '@angular/core/testing';
import { LoginForm } from './login-form';
import { AuthRoutes } from '@core/auth/auth-routes';
import { provideRouter } from '@angular/router';

describe('Login form', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm],
      providers: [
        provideRouter([]),
        {
          provide: AuthRoutes,
          useValue: new AuthRoutes('/login', '/signup', '/confirm', '/logout', '/forgot-password'),
        },
      ],
    }).compileComponents();
  });

  it('should render', async () => {
    const fixture = TestBed.createComponent(LoginForm);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const emailAttrs = compiled.querySelector('input#email')?.attributes;
    expect(emailAttrs?.getNamedItem('formControlName')?.value).toBe('email');
    expect(emailAttrs?.getNamedItem('type')?.value).toBe('email');

    const passwordAttrs = compiled.querySelector('input#password')?.attributes;
    expect(passwordAttrs?.getNamedItem('formControlName')?.value).toBe('password');
    expect(passwordAttrs?.getNamedItem('type')?.value).toBe('password');
  });
});
