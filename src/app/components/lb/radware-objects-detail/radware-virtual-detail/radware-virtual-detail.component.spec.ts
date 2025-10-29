import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadwareVirtualDetailComponent } from './radware-virtual-detail.component';

describe('RadwareVirtualDetailComponent', () => {
  let component: RadwareVirtualDetailComponent;
  let fixture: ComponentFixture<RadwareVirtualDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadwareVirtualDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadwareVirtualDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
