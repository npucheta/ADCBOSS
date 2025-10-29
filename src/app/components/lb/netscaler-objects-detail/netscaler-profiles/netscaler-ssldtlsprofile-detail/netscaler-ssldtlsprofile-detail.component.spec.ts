import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerSSLDTLSProfileDetailComponent } from './netscaler-ssldtlsprofile-detail.component';

describe('NetscalerSSLDTLSProfileDetailComponent', () => {
  let component: NetscalerSSLDTLSProfileDetailComponent;
  let fixture: ComponentFixture<NetscalerSSLDTLSProfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerSSLDTLSProfileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerSSLDTLSProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
