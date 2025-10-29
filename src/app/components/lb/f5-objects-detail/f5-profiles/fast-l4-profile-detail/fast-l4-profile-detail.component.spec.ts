import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {FastL4ProfileDetailComponent} from './fast-l4-profile-detail.component';

describe('FastL4ProfileDetailComponent', () => {
    let component: FastL4ProfileDetailComponent;
    let fixture: ComponentFixture<FastL4ProfileDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FastL4ProfileDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FastL4ProfileDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});