import { TestBed } from '@angular/core/testing';

import { CustomerHomeService } from './customer-home.service';

describe('CustomerHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerHomeService = TestBed.get(CustomerHomeService);
    expect(service).toBeTruthy();
  });
});
