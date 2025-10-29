import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerCRPolicyDetailComponent } from './netscaler-crpolicy-detail.component';

describe('NetscalerCRPolicyDetailComponent', () => {
  let component: NetscalerCRPolicyDetailComponent;
  let fixture: ComponentFixture<NetscalerCRPolicyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerCRPolicyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerCRPolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
