import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {HTTPProfileDetailComponent} from './httpprofile-detail.component';

describe('HTTPProfileDetailComponent', () => {
    let component: HTTPProfileDetailComponent;
    let fixture: ComponentFixture<HTTPProfileDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HTTPProfileDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HTTPProfileDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});