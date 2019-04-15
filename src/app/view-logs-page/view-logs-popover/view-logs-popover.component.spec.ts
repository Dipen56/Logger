import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLogsPopoverComponent } from './view-logs-popover.component';

describe('ViewLogsPopoverComponent', () => {
  let component: ViewLogsPopoverComponent;
  let fixture: ComponentFixture<ViewLogsPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLogsPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLogsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
