import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericObjectChartDetailComponent } from './generic-object-chart-detail.component';

describe('GenericObjectChartDetailComponent', () => {
  let component: GenericObjectChartDetailComponent;
  let fixture: ComponentFixture<GenericObjectChartDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericObjectChartDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericObjectChartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
