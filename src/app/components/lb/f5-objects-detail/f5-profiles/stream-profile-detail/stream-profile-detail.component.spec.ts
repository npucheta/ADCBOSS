import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {StreamProfileDetailComponent} from './stream-profile-detail.component';

describe('StreamProfileDetailComponent', () => {
    let component: StreamProfileDetailComponent;
    let fixture: ComponentFixture<StreamProfileDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StreamProfileDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StreamProfileDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});