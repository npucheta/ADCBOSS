import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AWStargetgroupDetailComponent } from './awstargetgroup-detail.component';

describe('AWStargetgroupDetailComponent', () => {
  let component: AWStargetgroupDetailComponent;
  let fixture: ComponentFixture<AWStargetgroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AWStargetgroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AWStargetgroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
