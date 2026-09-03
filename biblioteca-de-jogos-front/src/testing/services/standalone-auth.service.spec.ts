import { TestBed } from '@angular/core/testing';

import { StandaloneAuthService } from './standalone-auth.service.js';

describe('StandaloneAuthServiceTs', () => {
  let service: StandaloneAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandaloneAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
