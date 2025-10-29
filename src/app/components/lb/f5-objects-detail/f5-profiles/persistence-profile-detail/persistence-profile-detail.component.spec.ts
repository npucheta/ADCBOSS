import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {PersistenceProfileDetailComponent} from './persistence-profile-detail.component';

describe('PersistenceProfileDetailComponent', () => {
    let component: PersistenceProfileDetailComponent;
    let fixture: ComponentFixture<PersistenceProfileDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PersistenceProfileDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PersistenceProfileDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});