import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AWSDeviceDetailComponent } from './aws-device-detail.component';

describe('AWSDeviceDetailComponent', () => {
  let component: AWSDeviceDetailComponent;
  let fixture: ComponentFixture<AWSDeviceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AWSDeviceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AWSDeviceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
