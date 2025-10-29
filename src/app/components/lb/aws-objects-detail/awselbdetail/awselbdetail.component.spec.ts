import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AWSELBDetailComponent } from './awselbdetail.component';

describe('AWSELBDetailComponent', () => {
  let component: AWSELBDetailComponent;
  let fixture: ComponentFixture<AWSELBDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AWSELBDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AWSELBDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
