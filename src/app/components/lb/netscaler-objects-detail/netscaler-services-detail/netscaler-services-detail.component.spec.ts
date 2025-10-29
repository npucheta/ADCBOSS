import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerServicesDetailComponent } from './netscaler-services-detail.component';

describe('NetscalerServicesDetailComponent', () => {
  let component: NetscalerServicesDetailComponent;
  let fixture: ComponentFixture<NetscalerServicesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerServicesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerServicesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
