import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerHTTPProfileDetailComponent } from './netscaler-httpprofile-detail.component';

describe('NetscalerHTTPProfileDetailComponent', () => {
  let component: NetscalerHTTPProfileDetailComponent;
  let fixture: ComponentFixture<NetscalerHTTPProfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerHTTPProfileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerHTTPProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
