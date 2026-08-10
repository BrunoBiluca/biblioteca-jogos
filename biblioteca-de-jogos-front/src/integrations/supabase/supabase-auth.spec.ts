import { TestBed } from '@angular/core/testing';

import { SupabaseAuth } from './supabase-auth';

describe('SupabaseAuth', () => {
  let service: SupabaseAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
