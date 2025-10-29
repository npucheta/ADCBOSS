import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {GSLBMonitorDetailComponent} from './gslbmonitor-detail.component';

describe('GSLBMonitorDetailComponent', () => {
    let component: GSLBMonitorDetailComponent;
    let fixture: ComponentFixture<GSLBMonitorDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GSLBMonitorDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GSLBMonitorDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});