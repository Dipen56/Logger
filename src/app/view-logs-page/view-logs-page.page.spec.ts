import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLogsPagePage } from './view-logs-page.page';

describe('ViewLogsPagePage', () => {
  let component: ViewLogsPagePage;
  let fixture: ComponentFixture<ViewLogsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLogsPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLogsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
