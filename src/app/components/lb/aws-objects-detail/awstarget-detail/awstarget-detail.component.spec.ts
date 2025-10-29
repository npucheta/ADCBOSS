import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AWStargetDetailComponent } from './awstarget-detail.component';

describe('AWStargetDetailComponent', () => {
  let component: AWStargetDetailComponent;
  let fixture: ComponentFixture<AWStargetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AWStargetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AWStargetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
