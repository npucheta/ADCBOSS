import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {GSLBiRuleDetailComponent} from './gslbi-rule-detail.component';

describe('GSLBiRuleDetailComponent', () => {
    let component: GSLBiRuleDetailComponent;
    let fixture: ComponentFixture<GSLBiRuleDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GSLBiRuleDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GSLBiRuleDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});