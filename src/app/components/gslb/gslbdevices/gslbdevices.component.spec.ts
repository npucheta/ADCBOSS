import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {GSLBDevicesComponent} from './gslbdevices.component';

describe('GSLBDevicesComponent', () => {
    let component: GSLBDevicesComponent;
    let fixture: ComponentFixture<GSLBDevicesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GSLBDevicesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GSLBDevicesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});