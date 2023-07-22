import { TestBed } from '@angular/core/testing';

import { ExceptionManagerService } from './exception-manager.service';

describe('ExceptionManagerService', () => {
  let service: ExceptionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExceptionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
