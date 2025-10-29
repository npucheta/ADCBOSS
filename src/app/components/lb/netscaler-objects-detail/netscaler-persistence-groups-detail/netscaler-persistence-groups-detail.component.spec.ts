import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetscalerPersistenceGroupsDetailComponent } from './netscaler-persistence-groups-detail.component';

describe('NetscalerPersistenceGroupsDetailComponent', () => {
  let component: NetscalerPersistenceGroupsDetailComponent;
  let fixture: ComponentFixture<NetscalerPersistenceGroupsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetscalerPersistenceGroupsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetscalerPersistenceGroupsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
