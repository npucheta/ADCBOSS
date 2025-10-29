import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {TCPProfileDetailComponent} from './tcpprofile-detail.component';

describe('TCPProfileDetailComponent', () => {
    let component: TCPProfileDetailComponent;
    let fixture: ComponentFixture<TCPProfileDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TCPProfileDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TCPProfileDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});