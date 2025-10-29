import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerMonitorDetailComponent } from './netscaler-monitor-detail.component';

describe('NetscalerMonitorDetailComponent', () => {
  let component: NetscalerMonitorDetailComponent;
  let fixture: ComponentFixture<NetscalerMonitorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerMonitorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerMonitorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
