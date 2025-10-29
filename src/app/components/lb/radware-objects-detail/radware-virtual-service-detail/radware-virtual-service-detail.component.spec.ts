import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadwareVirtualServiceDetailComponent } from './radware-virtual-service-detail.component';

describe('RadwareVirtualServiceDetailComponent', () => {
  let component: RadwareVirtualServiceDetailComponent;
  let fixture: ComponentFixture<RadwareVirtualServiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadwareVirtualServiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadwareVirtualServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
