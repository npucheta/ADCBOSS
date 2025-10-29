import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerCSActionDetailComponent } from './netscaler-csaction-detail.component';

describe('NetscalerCSActionDetailComponent', () => {
  let component: NetscalerCSActionDetailComponent;
  let fixture: ComponentFixture<NetscalerCSActionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerCSActionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerCSActionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
