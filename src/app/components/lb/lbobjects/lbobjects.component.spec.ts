import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {LBObjectsComponent} from './lbobjects.component';

describe('LBObjectsComponent', () => {
    let component: LBObjectsComponent;
    let fixture: ComponentFixture<LBObjectsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LBObjectsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LBObjectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
