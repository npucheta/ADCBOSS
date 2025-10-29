import { TestBed, inject } from '@angular/core/testing';

import { GenericLoadBalancerService } from './generic-load-balancer.service';

describe('GenericLoadBalancerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericLoadBalancerService]
    });
  });

  it('should be created', inject([GenericLoadBalancerService], (service: GenericLoadBalancerService) => {
    expect(service).toBeTruthy();
  }));
});
