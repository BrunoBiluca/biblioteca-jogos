import { Injectable } from '@angular/core';
import { LoggedUser } from './logged-user.model';

@Injectable()
export abstract class AuthService {
  abstract signup(email: string, password: string, name: string): Promise<void>;
  abstract login(email: string, password: string): Promise<void>;
  abstract logout(): Promise<void>;
  abstract getLoggedUser(): Promise<LoggedUser | null>;
  abstract resetPassword(email: string): Promise<void>;
  abstract changePassword(newPassword: string): Promise<void>;
}
