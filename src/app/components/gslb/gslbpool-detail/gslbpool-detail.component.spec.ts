import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {GSLBPoolDetailComponent} from './gslbpool-detail.component';

describe('GSLBPoolDetailComponent', () => {
    let component: GSLBPoolDetailComponent;
    let fixture: ComponentFixture<GSLBPoolDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GSLBPoolDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GSLBPoolDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});