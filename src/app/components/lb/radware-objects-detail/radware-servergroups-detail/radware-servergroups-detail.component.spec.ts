import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadwareServergroupsDetailComponent } from './radware-servergroups-detail.component';

describe('RadwareServergroupsDetailComponent', () => {
  let component: RadwareServergroupsDetailComponent;
  let fixture: ComponentFixture<RadwareServergroupsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadwareServergroupsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadwareServergroupsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
