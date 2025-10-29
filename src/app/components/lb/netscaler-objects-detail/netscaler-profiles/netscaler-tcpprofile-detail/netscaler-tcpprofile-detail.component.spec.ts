import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerTCPProfileDetailComponent } from './netscaler-tcpprofile-detail.component';

describe('NetscalerTCPProfileDetailComponent', () => {
  let component: NetscalerTCPProfileDetailComponent;
  let fixture: ComponentFixture<NetscalerTCPProfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerTCPProfileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerTCPProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
