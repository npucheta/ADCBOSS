import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerCSVirtualDetailComponent } from './netscaler-csvirtual-detail.component';

describe('NetscalerCSVirtualDetailComponent', () => {
  let component: NetscalerCSVirtualDetailComponent;
  let fixture: ComponentFixture<NetscalerCSVirtualDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerCSVirtualDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerCSVirtualDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
