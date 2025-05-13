import { TestBed } from '@angular/core/testing';

import { AqmService } from './aqm.service';

describe('AqmService', () => {
  let service: AqmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AqmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
