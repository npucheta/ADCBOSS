import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {OneConnectProfileDetailComponent} from './one-connect-profile-detail.component';

describe('OneConnectProfileDetailComponent', () => {
    let component: OneConnectProfileDetailComponent;
    let fixture: ComponentFixture<OneConnectProfileDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OneConnectProfileDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OneConnectProfileDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});