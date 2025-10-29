import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AWSListenerDetailComponent } from './awslistener-detail.component';

describe('AWSListenerDetailComponent', () => {
  let component: AWSListenerDetailComponent;
  let fixture: ComponentFixture<AWSListenerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AWSListenerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AWSListenerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
