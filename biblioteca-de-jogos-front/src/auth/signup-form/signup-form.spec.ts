import { TestBed } from '@angular/core/testing';
import { AuthRoutes } from '@core/auth/auth-routes';
import { provideRouter } from '@angular/router';
import { SignupForm } from './signup-form';
import { AuthService } from '@/core/auth/auth.service';
import { StandaloneAuthService } from '@/testing/services/standalone-auth-service';

describe('Login form', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupForm],
      providers: [
        provideRouter([]),
        {
          provide: AuthRoutes,
          useValue: new AuthRoutes('/login', '/signup', '/confirm', '/logout', '/forgot-password'),
        },
        {
          provide: AuthService,
          useClass: StandaloneAuthService,
        },
      ],
    }).compileComponents();
  });

  it('should render', async () => {
    const fixture = TestBed.createComponent(SignupForm);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const nameAttrs = compiled.querySelector('input#name')?.attributes;
    expect(nameAttrs?.getNamedItem('formControlName')?.value).toBe('name');
    expect(nameAttrs?.getNamedItem('type')?.value).toBe('text');

    const emailAttrs = compiled.querySelector('input#email')?.attributes;
    expect(emailAttrs?.getNamedItem('formControlName')?.value).toBe('email');
    expect(emailAttrs?.getNamedItem('type')?.value).toBe('email');

    const passwordAttrs = compiled.querySelector('input#password')?.attributes;
    expect(passwordAttrs?.getNamedItem('formControlName')?.value).toBe('password');
    expect(passwordAttrs?.getNamedItem('type')?.value).toBe('password');
  });
});
