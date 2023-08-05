import { TestBed } from '@angular/core/testing';

import { SmartBinService } from './smart-bin.service';

describe('SmartbinService', () => {
  let service: SmartBinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartBinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
