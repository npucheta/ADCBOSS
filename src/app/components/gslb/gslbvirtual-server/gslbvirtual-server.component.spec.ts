import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {GSLBVirtualServerComponent} from './gslbvirtual-server.component';

describe('GSLBVirtualServerComponent', () => {
    let component: GSLBVirtualServerComponent;
    let fixture: ComponentFixture<GSLBVirtualServerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GSLBVirtualServerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GSLBVirtualServerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});