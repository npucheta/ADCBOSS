import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A10ServiceGroupDetailComponent } from './a10-service-group-detail.component';

describe('A10ServiceGroupDetailComponent', () => {
  let component: A10ServiceGroupDetailComponent;
  let fixture: ComponentFixture<A10ServiceGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A10ServiceGroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A10ServiceGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
