import { TestBed } from '@angular/core/testing';

import { EServiceService } from './eservice.service';

describe('EServiceService', () => {
  let service: EServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
