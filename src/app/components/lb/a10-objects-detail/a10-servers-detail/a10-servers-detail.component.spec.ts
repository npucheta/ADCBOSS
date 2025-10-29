import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A10ServersDetailComponent } from './a10-servers-detail.component';

describe('A10ServersDetailComponent', () => {
  let component: A10ServersDetailComponent;
  let fixture: ComponentFixture<A10ServersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A10ServersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A10ServersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
