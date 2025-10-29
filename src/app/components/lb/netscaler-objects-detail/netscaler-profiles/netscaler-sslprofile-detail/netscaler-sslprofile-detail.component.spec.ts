import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerSSLProfileDetailComponent } from './netscaler-sslprofile-detail.component';

describe('NetscalerSSLProfileDetailComponent', () => {
  let component: NetscalerSSLProfileDetailComponent;
  let fixture: ComponentFixture<NetscalerSSLProfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerSSLProfileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerSSLProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
