import { TestBed, inject } from '@angular/core/testing';

import { A10Service } from './a10.service';

describe('A10Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [A10Service]
    });
  });

  it('should be created', inject([A10Service], (service: A10Service) => {
    expect(service).toBeTruthy();
  }));
});
