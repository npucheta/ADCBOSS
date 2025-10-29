import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {HTTPClassDetailComponent} from './httpclass-detail.component';

describe('HTTPClassDetailComponent', () => {
    let component: HTTPClassDetailComponent;
    let fixture: ComponentFixture<HTTPClassDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HTTPClassDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HTTPClassDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});