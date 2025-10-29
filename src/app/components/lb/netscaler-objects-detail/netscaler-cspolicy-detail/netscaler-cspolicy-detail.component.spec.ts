import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerCSPolicyDetailComponent } from './netscaler-cspolicy-detail.component';

describe('NetscalerCSPolicyDetailComponent', () => {
  let component: NetscalerCSPolicyDetailComponent;
  let fixture: ComponentFixture<NetscalerCSPolicyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerCSPolicyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerCSPolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
