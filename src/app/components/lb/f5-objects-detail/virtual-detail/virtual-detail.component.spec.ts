import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {VirtualDetailComponent} from './virtual-detail.component';

describe('VirtualDetailComponent', () => {
    let component: VirtualDetailComponent;
    let fixture: ComponentFixture<VirtualDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VirtualDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VirtualDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});