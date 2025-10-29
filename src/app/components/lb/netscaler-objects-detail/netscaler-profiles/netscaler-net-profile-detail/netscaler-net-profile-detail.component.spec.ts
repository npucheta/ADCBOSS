import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerNetProfileDetailComponent } from './netscaler-net-profile-detail.component';

describe('NetscalerNetProfileDetailComponent', () => {
  let component: NetscalerNetProfileDetailComponent;
  let fixture: ComponentFixture<NetscalerNetProfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerNetProfileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerNetProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
