import { TestBed, inject } from '@angular/core/testing';

import { RadwareService } from './radware.service';

describe('RadwareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RadwareService]
    });
  });

  it('should be created', inject([RadwareService], (service: RadwareService) => {
    expect(service).toBeTruthy();
  }));
});
