import { TestBed, inject } from '@angular/core/testing';

import { NetscalerService } from './netscaler.service';

describe('NetscalerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetscalerService]
    });
  });

  it('should be created', inject([NetscalerService], (service: NetscalerService) => {
    expect(service).toBeTruthy();
  }));
});
