import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerProfileDetailComponent } from './netscaler-profile-detail.component';

describe('NetscalerProfileDetailComponent', () => {
  let component: NetscalerProfileDetailComponent;
  let fixture: ComponentFixture<NetscalerProfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerProfileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
