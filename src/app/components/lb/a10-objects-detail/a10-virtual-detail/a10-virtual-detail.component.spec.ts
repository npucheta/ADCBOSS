import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A10VirtualDetailComponent } from './a10-virtual-detail.component';

describe('A10VirtualDetailComponent', () => {
  let component: A10VirtualDetailComponent;
  let fixture: ComponentFixture<A10VirtualDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A10VirtualDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A10VirtualDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
