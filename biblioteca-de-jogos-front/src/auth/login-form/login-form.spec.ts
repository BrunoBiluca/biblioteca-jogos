import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginForm } from './login-form';
import { AuthRoutes } from '@core/auth/auth-routes';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '@/core/auth/auth.service';
import { InvalidCredentialsException, UserNotFoundException } from '@core/auth/auth-exceptions';

describe('Login form', () => {
  let fixture: ComponentFixture<LoginForm>;
  let component: LoginForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm],
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

    fixture = TestBed.createComponent(LoginForm);
    await fixture.whenStable();
    component = fixture.componentInstance;
  });

  it('should render', async () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const emailAttrs = compiled.querySelector('input#email')?.attributes;
    expect(emailAttrs?.getNamedItem('formControlName')?.value).toBe('email');
    expect(emailAttrs?.getNamedItem('type')?.value).toBe('email');

    const passwordAttrs = compiled.querySelector('input#password')?.attributes;
    expect(passwordAttrs?.getNamedItem('formControlName')?.value).toBe('password');
    expect(passwordAttrs?.getNamedItem('type')?.value).toBe('password');
  });

  it('should be invalid when email is invalid', async () => {
    await setFormValues('invalid-email', 'password');

    component.form.markAsTouched();
    expect(component.form.valid).toBe(false);
  });

  it('should warning user when email and password do not match', async () => {
    await setFormValues('m@example.com', 'wrong-password');
    formSubmit();

    expect(component.auth.login).toHaveBeenCalledWith('m@example.com', 'wrong-password');
    expect(component.form.valid).toBe(false);
  });

  it('when email and password match should be valid and submit', async () => {
    const navigateSpy = vi.spyOn(component.router, 'navigate');

    await setFormValues('m@example.com', 'password');
    formSubmit();

    await fixture.whenStable();

    expect(component.form.valid).toBe(true);
    expect(component.auth.login).toHaveBeenCalledWith('m@example.com', 'password');
    expect(component.auth.login).toHaveReturnedWith(Promise.resolve());
    expect(navigateSpy).toHaveBeenCalledWith([component.authRoutes.afterLogin]);
  });

  async function setFormValues(email: string, password: string) {
    const compiled = fixture.nativeElement as HTMLElement;

    const emailInput = compiled.querySelector('input#email') as HTMLInputElement;
    const passwordInput = compiled.querySelector('input#password') as HTMLInputElement;

    emailInput.value = email;
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = password;
    passwordInput.dispatchEvent(new Event('input'));

    component.form.markAsTouched();
    await fixture.whenStable();
  }

  function formSubmit() {
    const compiled = fixture.nativeElement as HTMLElement;
    const submitBtn = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    submitBtn.click();
  }
});
