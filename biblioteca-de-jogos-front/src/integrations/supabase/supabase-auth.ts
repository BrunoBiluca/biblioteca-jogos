import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthService } from '@/core/auth/auth.service';
import { LoggedUser } from '@/core/auth/logged-user.model';
import { environment } from '@/environment';
import { inject, Injectable } from '@angular/core';
import { AuthRoutes } from '@/core/auth/auth-routes';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuth implements AuthService {
  private supabase: SupabaseClient;
  authRoutes = inject(AuthRoutes);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabasePublishableKey,
    );
  }

  async signup(email: string, password: string, name: string): Promise<void> {
    try {
      const { error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: name,
          },
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const { error } = await this.supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;
    } catch (error: unknown) {
      throw error;
    }
  }
  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async getLoggedUser(): Promise<LoggedUser | null> {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      return null;
    }

    return new LoggedUser(
      data.user.id,
      data.user.email!,
      data.user!.user_metadata['username'],
    );
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + this.authRoutes.forgotPassword,
    });

    if (error) {
      throw error;
    }
  }

  async changePassword(newPassword: string): Promise<void> {
    const { error } = await this.supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw error;
    }
  }
}
