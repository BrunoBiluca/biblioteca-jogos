import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthService } from '@/core/auth/auth.service';
import { LoggedUser } from '@/core/auth/logged-user.model';
import { environment } from '@/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuth implements AuthService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabasePublishableKey);
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
    this.supabase.auth.signOut();
  }

  async confirm(email: string, code: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getLoggedUser(): Promise<LoggedUser | null> {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      return null;
    }

    return new LoggedUser(data.user.id, data.user.email!, data.user!.user_metadata['username']);
  }
}
