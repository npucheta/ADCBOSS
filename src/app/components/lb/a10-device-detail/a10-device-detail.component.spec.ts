import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A10DeviceDetailComponent } from './a10-device-detail.component';

describe('A10DeviceDetailComponent', () => {
  let component: A10DeviceDetailComponent;
  let fixture: ComponentFixture<A10DeviceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A10DeviceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A10DeviceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
