import { TestBed } from '@angular/core/testing';
import { SupabaseGameService } from './supabase-game.service';

describe('SupabaseGameService', () => {
  let service: SupabaseGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SupabaseGameService] });
    service = TestBed.inject(SupabaseGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
