import { TestBed } from '@angular/core/testing';

import { SmartBinRequestService } from './smart-bin-request.service';

describe('SmartbinRequestService', () => {
  let service: SmartBinRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartBinRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
