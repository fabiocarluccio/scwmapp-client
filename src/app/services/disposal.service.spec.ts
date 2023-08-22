import { TestBed } from '@angular/core/testing';

import { DisposalService } from './disposal.service';

describe('DisposalService', () => {
  let service: DisposalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisposalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
