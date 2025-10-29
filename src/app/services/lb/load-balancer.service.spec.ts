import { TestBed, inject } from '@angular/core/testing';

import { LoadBalancerService } from './load-balancer.service';

describe('LoadBalancerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadBalancerService]
    });
  });

  it('should be created', inject([LoadBalancerService], (service: LoadBalancerService) => {
    expect(service).toBeTruthy();
  }));
});
