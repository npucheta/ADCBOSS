import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerServicegroupsDetailComponent } from './netscaler-servicegroups-detail.component';

describe('NetscalerServicegroupsDetailComponent', () => {
  let component: NetscalerServicegroupsDetailComponent;
  let fixture: ComponentFixture<NetscalerServicegroupsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerServicegroupsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerServicegroupsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
