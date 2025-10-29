import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { F5DeviceDetailComponent } from './f5-device-detail.component';

describe('DeviceDetailComponent', () => {
  let component: F5DeviceDetailComponent;
  let fixture: ComponentFixture<F5DeviceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [F5DeviceDetailComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(F5DeviceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});