import { TestBed } from '@angular/core/testing';

import { FmcService } from './fmc.service';

describe('FmcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FmcService = TestBed.get(FmcService);
    expect(service).toBeTruthy();
  });
});
