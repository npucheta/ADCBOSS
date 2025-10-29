import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AWSzoneDetailComponent } from './awszone-detail.component';

describe('AWSzoneDetailComponent', () => {
  let component: AWSzoneDetailComponent;
  let fixture: ComponentFixture<AWSzoneDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AWSzoneDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AWSzoneDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
