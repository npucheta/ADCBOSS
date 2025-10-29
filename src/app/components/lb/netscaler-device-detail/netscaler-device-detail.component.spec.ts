import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerDeviceDetailComponent } from './netscaler-device-detail.component';

describe('NetscalerDeviceDetailComponent', () => {
  let component: NetscalerDeviceDetailComponent;
  let fixture: ComponentFixture<NetscalerDeviceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerDeviceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerDeviceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
