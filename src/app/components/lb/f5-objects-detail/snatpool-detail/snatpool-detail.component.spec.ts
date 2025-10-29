import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { SNATPoolDetailComponent } from './snatpool-detail.component';

describe('SNATPoolDetailComponent', () => {
  let component: SNATPoolDetailComponent;
  let fixture: ComponentFixture<SNATPoolDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SNATPoolDetailComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SNATPoolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
