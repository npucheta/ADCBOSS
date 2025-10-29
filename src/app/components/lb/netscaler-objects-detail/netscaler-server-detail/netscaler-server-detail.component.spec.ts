import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerServerDetailComponent } from './netscaler-server-detail.component';

describe('NetscalerServerDetailComponent', () => {
  let component: NetscalerServerDetailComponent;
  let fixture: ComponentFixture<NetscalerServerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerServerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerServerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
