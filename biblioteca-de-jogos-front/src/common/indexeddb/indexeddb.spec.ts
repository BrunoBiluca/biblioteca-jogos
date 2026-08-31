import { TestBed } from '@angular/core/testing';

import { IndexedDB } from './indexeddb';

describe('Indexdb', () => {
  let service: IndexedDB;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexedDB);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
