import { TestBed } from '@angular/core/testing';

import { MutationService } from './mutation.service';

describe('MutationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MutationService = TestBed.get(MutationService);
    expect(service).toBeTruthy();
  });
});
