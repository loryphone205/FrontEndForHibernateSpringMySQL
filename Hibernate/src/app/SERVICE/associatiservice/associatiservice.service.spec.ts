import { TestBed } from '@angular/core/testing';

import { AssociatiserviceService } from './associatiservice.service';

describe('AssociatiserviceService', () => {
  let service: AssociatiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociatiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
