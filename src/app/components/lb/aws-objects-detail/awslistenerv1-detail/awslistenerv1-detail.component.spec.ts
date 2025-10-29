import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AWSListenerv1DetailComponent } from './awslistenerv1-detail.component';

describe('AWSListenerv1DetailComponent', () => {
  let component: AWSListenerv1DetailComponent;
  let fixture: ComponentFixture<AWSListenerv1DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AWSListenerv1DetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AWSListenerv1DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
