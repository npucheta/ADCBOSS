import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {GSLBObjectsComponent} from './gslbobjects.component';

describe('GSLBObjectsComponent', () => {
    let component: GSLBObjectsComponent;
    let fixture: ComponentFixture<GSLBObjectsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GSLBObjectsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GSLBObjectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});