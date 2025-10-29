import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadwareRealserversDetailComponent } from './radware-realservers-detail.component';

describe('RadwareRealserversDetailComponent', () => {
  let component: RadwareRealserversDetailComponent;
  let fixture: ComponentFixture<RadwareRealserversDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadwareRealserversDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadwareRealserversDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
