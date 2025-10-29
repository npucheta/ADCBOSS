import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadwareDeviceDetailComponent } from './radware-device-detail.component';

describe('RadwareDeviceDetailComponent', () => {
  let component: RadwareDeviceDetailComponent;
  let fixture: ComponentFixture<RadwareDeviceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadwareDeviceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadwareDeviceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
