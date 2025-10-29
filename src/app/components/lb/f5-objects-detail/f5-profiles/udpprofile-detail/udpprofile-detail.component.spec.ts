import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {UDPProfileDetailComponent} from './udpprofile-detail.component';

describe('UDPProfileDetailComponent', () => {
    let component: UDPProfileDetailComponent;
    let fixture: ComponentFixture<UDPProfileDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UDPProfileDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UDPProfileDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});