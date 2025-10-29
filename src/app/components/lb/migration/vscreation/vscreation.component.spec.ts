import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VscreationComponent } from './vscreation.component';

describe('VscreationComponent', () => {
  let component: VscreationComponent;
  let fixture: ComponentFixture<VscreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VscreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VscreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
