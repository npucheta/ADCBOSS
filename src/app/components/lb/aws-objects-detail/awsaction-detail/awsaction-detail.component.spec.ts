import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AWSactionDetailComponent } from './awsaction-detail.component';

describe('AWSactionDetailComponent', () => {
  let component: AWSactionDetailComponent;
  let fixture: ComponentFixture<AWSactionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AWSactionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AWSactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
