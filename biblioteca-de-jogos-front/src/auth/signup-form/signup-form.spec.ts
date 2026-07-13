import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthRoutes } from '@core/auth/auth-routes';
import { provideRouter, Router } from '@angular/router';
import { SignupForm } from './signup-form';
import { AuthService } from '@/core/auth/auth.service';
import { StandaloneAuthService } from '@/testing/services/standalone-auth-service';

describe('Login form', () => {
  let fixture: ComponentFixture<SignupForm>;
  let component: SignupForm;
  let authService: AuthService;
  let authRoutes: AuthRoutes;

  beforeEach(async () => {
    authService = {
      signup: vi.fn(),
      confirm: vi.fn(),
      logout: vi.fn(),
      login: vi.fn(),
      getLoggedUser: vi.fn(),
    };

    authRoutes = new AuthRoutes('/login', '/signup', '/confirm', '/logout', '/forgot-password');

    await TestBed.configureTestingModule({
      imports: [SignupForm],
      providers: [
        provideRouter([]),
        {
          provide: AuthRoutes,
          useValue: authRoutes,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should render', async () => {
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

    const confirmPasswordAttrs = compiled.querySelector('input#confirmPassword')?.attributes;
    expect(confirmPasswordAttrs?.getNamedItem('formControlName')?.value).toBe('confirmPassword');
    expect(confirmPasswordAttrs?.getNamedItem('type')?.value).toBe('password');
  });

  it('should be invalid when password does not match', async () => {
    setFormValues('John Doe', 'm@example.com', 'password', 'wrong-password');

    const component = fixture.componentInstance;
    component.form.markAsTouched();
    expect(component.form.valid).toBe(false);
  });

  it('should be invalid when email is invalid', async () => {
    setFormValues('John Doe', 'invalid-email', 'password', 'password');

    component.form.markAsTouched();
    expect(component.form.valid).toBe(false);
  });

  it('should be invalid when name is empty', async () => {
    setFormValues('', 'm@example.com', 'password', 'password');

    component.form.markAsTouched();
    expect(component.form.valid).toBe(false);
  });

  it('should be valid', async () => {
    setFormValues('John Doe', 'm@example.com', 'password', 'password');
    component.form.markAsTouched();
    expect(component.form.valid).toBeTruthy();
  });

  it('should submit', async () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate');

    setFormValues('John Doe', 'm@example.com', 'password', 'password');
    component.signup();

    expect(component.auth.signup).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith([authRoutes.login]);
  });

  function setFormValues(name: string, email: string, password: string, confirmPassword: string) {
    const compiled = fixture.nativeElement as HTMLElement;

    const nameInput = compiled.querySelector('input#name') as HTMLInputElement;
    const emailInput = compiled.querySelector('input#email') as HTMLInputElement;
    const passwordInput = compiled.querySelector('input#password') as HTMLInputElement;
    const confirmPasswordInput = compiled.querySelector(
      'input#confirmPassword',
    ) as HTMLInputElement;

    nameInput.value = name;
    nameInput.dispatchEvent(new Event('input'));

    emailInput.value = email;
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = password;
    passwordInput.dispatchEvent(new Event('input'));

    confirmPasswordInput.value = confirmPassword;
    confirmPasswordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
  }
});
