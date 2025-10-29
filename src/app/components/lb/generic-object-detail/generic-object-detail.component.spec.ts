import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericObjectDetailComponent } from './generic-object-detail.component';

describe('GenericObjectDetailComponent', () => {
  let component: GenericObjectDetailComponent;
  let fixture: ComponentFixture<GenericObjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericObjectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericObjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
