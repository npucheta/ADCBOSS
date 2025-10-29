import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {WideIPDetailComponent} from './wide-ipdetail.component';

describe('WideIPDetailComponent', () => {
    let component: WideIPDetailComponent;
    let fixture: ComponentFixture<WideIPDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WideIPDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WideIPDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});