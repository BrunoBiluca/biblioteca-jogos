import {
  InvalidCredentialsException,
  UserNotConfirmedException,
  UserNotFoundException,
} from '@/core/auth/auth-exceptions';
import { AuthService } from '@/core/auth/auth.service';
import { LoggedUser } from '@/core/auth/logged-user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StandaloneAuthService implements AuthService {
  signup(email: string, password: string, name: string): Promise<void> {
    localStorage.setItem('registered_user', `${email}:${password}:${name}:false`);
    return Promise.resolve();
  }

  login(email: string, password: string): Promise<void> {
    let registeredUser = localStorage.getItem('registered_user');
    if (!registeredUser) {
      throw new Error('User not registered');
    }

    let [registeredEmail, registeredPassword, registeredName, registeredConfirm] =
      registeredUser.split(':');

    if (registeredEmail !== email) {
      throw new UserNotFoundException();
    }

    if (registeredPassword !== password) {
      throw new InvalidCredentialsException();
    }

    if (registeredConfirm === 'false') {
      throw new UserNotConfirmedException();
    }

    localStorage.setItem('token', 'exists');
    return Promise.resolve();
  }

  logout(): Promise<void> {
    localStorage.removeItem('token');
    return Promise.resolve();
  }

  confirm(email: string, code: string): Promise<void> {
    let registeredUser = localStorage.getItem('registered_user');
    if (!registeredUser) {
      return Promise.reject('User not registered');
    }

    let [registeredEmail, registeredPassword, registeredName] = registeredUser.split(':');
    if (registeredEmail !== email) {
      return Promise.reject('Confirmation code is not valid for this email');
    }

    localStorage.setItem(
      'registered_user',
      `${registeredEmail}:${registeredPassword}:${registeredName}:true`,
    );
    return Promise.resolve();
  }

  getLoggedUser(): Promise<LoggedUser | null> {
    let token = localStorage.getItem('token');
    if (!token) return Promise.resolve(null);

    let registeredUser = localStorage.getItem('registered_user');
    let [registeredEmail, , registeredName] = registeredUser!.split(':');
    return Promise.resolve(new LoggedUser(registeredEmail, registeredName, '123'));
  }
}
