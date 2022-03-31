import { TestBed } from '@angular/core/testing';

import { BreakingBadService } from './breaking-bad.service';

describe('BreakingBadService', () => {
  let service: BreakingBadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakingBadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
