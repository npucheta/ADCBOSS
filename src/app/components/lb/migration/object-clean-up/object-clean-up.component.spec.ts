import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCleanUPComponent } from './object-clean-up.component';

describe('ObjectCleanUPComponent', () => {
  let component: ObjectCleanUPComponent;
  let fixture: ComponentFixture<ObjectCleanUPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectCleanUPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectCleanUPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
