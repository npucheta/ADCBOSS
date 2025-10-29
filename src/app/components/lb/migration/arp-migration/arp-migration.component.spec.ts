import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArpMigrationComponent } from './arp-migration.component';

describe('ArpMigrationComponent', () => {
  let component: ArpMigrationComponent;
  let fixture: ComponentFixture<ArpMigrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArpMigrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArpMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
