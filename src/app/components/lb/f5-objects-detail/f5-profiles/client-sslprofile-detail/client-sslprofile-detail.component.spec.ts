import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {ClientSSLProfileDetailComponent} from './client-sslprofile-detail.component';

describe('ClientSSLProfileDetailComponent', () => {
    let component: ClientSSLProfileDetailComponent;
    let fixture: ComponentFixture<ClientSSLProfileDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientSSLProfileDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientSSLProfileDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});