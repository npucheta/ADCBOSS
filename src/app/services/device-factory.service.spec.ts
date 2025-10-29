import { TestBed, inject } from '@angular/core/testing';

import { DeviceFactoryService } from './device-factory.service';

describe('DeviceFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceFactoryService]
    });
  });

  it('should be created', inject([DeviceFactoryService], (service: DeviceFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
