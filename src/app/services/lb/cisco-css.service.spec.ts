import { TestBed, inject } from '@angular/core/testing';

import { CiscoCSSService } from './cisco-css.service';

describe('CiscoCSSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiscoCSSService]
    });
  });

  it('should be created', inject([CiscoCSSService], (service: CiscoCSSService) => {
    expect(service).toBeTruthy();
  }));
});
