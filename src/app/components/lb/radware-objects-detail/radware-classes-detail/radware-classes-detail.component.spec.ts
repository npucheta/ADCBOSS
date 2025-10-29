import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadwareClassesDetailComponent } from './radware-classes-detail.component';

describe('RadwareClassesDetailComponent', () => {
  let component: RadwareClassesDetailComponent;
  let fixture: ComponentFixture<RadwareClassesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadwareClassesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadwareClassesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
