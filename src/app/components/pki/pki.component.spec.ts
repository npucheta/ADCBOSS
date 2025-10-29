import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PKIComponent } from './pki.component';

describe('PKIComponent', () => {
  let component: PKIComponent;
  let fixture: ComponentFixture<PKIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PKIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PKIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
