/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {DevicesService} from './devices.service';

describe('Service: Devices', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DevicesService]
        });
    });

    it('should ...', inject([DevicesService], (service: DevicesService) => {
        expect(service).toBeTruthy();
    }));
});
