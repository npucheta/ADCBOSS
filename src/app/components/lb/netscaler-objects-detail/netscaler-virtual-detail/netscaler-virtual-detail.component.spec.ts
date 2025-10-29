import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerVirtualDetailComponent } from './netscaler-virtual-detail.component';

describe('NetscalerVirtualDetailComponent', () => {
  let component: NetscalerVirtualDetailComponent;
  let fixture: ComponentFixture<NetscalerVirtualDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerVirtualDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerVirtualDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
