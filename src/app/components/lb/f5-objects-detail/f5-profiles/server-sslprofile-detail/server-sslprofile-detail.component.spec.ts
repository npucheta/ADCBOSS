import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {ServerSSLProfileDetailComponent} from './server-sslprofile-detail.component';

describe('ServerSSLProfileDetailComponent', () => {
    let component: ServerSSLProfileDetailComponent;
    let fixture: ComponentFixture<ServerSSLProfileDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ServerSSLProfileDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ServerSSLProfileDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});