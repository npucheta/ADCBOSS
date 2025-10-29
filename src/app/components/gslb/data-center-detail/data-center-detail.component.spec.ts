import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {DataCenterDetailComponent} from './data-center-detail.component';

describe('DataCenterDetailComponent', () => {
    let component: DataCenterDetailComponent;
    let fixture: ComponentFixture<DataCenterDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DataCenterDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DataCenterDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});