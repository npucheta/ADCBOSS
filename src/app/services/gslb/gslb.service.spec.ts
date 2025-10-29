import {inject, TestBed} from '@angular/core/testing';
import {GSLBService} from './gslb.service';

describe('Service: GSLB', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GSLBService]
        });
    });

    it('should ...', inject([GSLBService], (service: GSLBService) => {
        expect(service).toBeTruthy();
    }));
});
