import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupDetailComponent } from './backup-detail.component';

describe('BackupDetailComponent', () => {
  let component: BackupDetailComponent;
  let fixture: ComponentFixture<BackupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
