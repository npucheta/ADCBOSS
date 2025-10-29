import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerCRVirtualDetailComponent } from './netscaler-crvirtual-detail.component';

describe('NetscalerCRVirtualDetailComponent', () => {
  let component: NetscalerCRVirtualDetailComponent;
  let fixture: ComponentFixture<NetscalerCRVirtualDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerCRVirtualDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerCRVirtualDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
