import { TestBed } from '@angular/core/testing';

import { CatergoryService } from './catergory.service';

describe('CatergoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatergoryService = TestBed.get(CatergoryService);
    expect(service).toBeTruthy();
  });
});
