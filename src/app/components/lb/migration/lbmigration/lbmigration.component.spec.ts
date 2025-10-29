/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LBMigrationComponent } from './lbmigration.component';

describe('LBMigrationComponent', () => {
  let component: LBMigrationComponent;
  let fixture: ComponentFixture<LBMigrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LBMigrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LBMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
