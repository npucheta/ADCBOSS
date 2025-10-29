import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AWSsslpolicyDetailComponent } from './awssslpolicy-detail.component';

describe('AWSsslpolicyDetailComponent', () => {
  let component: AWSsslpolicyDetailComponent;
  let fixture: ComponentFixture<AWSsslpolicyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AWSsslpolicyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AWSsslpolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
