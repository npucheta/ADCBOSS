import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerDBProfileDetailComponent } from './netscaler-dbprofile-detail.component';

describe('NetscalerDBProfileDetailComponent', () => {
  let component: NetscalerDBProfileDetailComponent;
  let fixture: ComponentFixture<NetscalerDBProfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerDBProfileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerDBProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
