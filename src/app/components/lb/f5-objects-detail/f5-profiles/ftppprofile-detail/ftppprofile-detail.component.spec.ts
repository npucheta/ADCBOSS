import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {FTPPProfileDetailComponent} from './ftppprofile-detail.component';

describe('FTPPProfileDetailComponent', () => {
    let component: FTPPProfileDetailComponent;
    let fixture: ComponentFixture<FTPPProfileDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FTPPProfileDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FTPPProfileDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});