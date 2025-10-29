import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AWSruleDetailComponent } from './awsrule-detail.component';

describe('AWSruleDetailComponent', () => {
  let component: AWSruleDetailComponent;
  let fixture: ComponentFixture<AWSruleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AWSruleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AWSruleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
