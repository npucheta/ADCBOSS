import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {iRuleDetailComponent} from './i-rule-detail.component';

describe('iRuleDetailComponent', () => {
    let component: iRuleDetailComponent;
    let fixture: ComponentFixture<iRuleDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [iRuleDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(iRuleDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});