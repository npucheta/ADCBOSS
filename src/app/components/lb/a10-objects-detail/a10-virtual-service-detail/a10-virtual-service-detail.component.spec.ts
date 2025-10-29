import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A10VirtualServiceDetailComponent } from './a10-virtual-service-detail.component';

describe('A10VirtualServiceDetailComponent', () => {
  let component: A10VirtualServiceDetailComponent;
  let fixture: ComponentFixture<A10VirtualServiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A10VirtualServiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A10VirtualServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
