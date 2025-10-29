import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceA10Component } from './device-a10.component';

describe('DeviceA10Component', () => {
  let component: DeviceA10Component;
  let fixture: ComponentFixture<DeviceA10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceA10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceA10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
