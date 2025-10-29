import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {GSLBDeviceDetailComponent} from './gslbdevice-detail.component';

describe('GSLBDeviceDetailComponent', () => {
    let component: GSLBDeviceDetailComponent;
    let fixture: ComponentFixture<GSLBDeviceDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GSLBDeviceDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GSLBDeviceDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});