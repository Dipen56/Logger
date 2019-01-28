import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInfoPagePage } from './log-info-page.page';

describe('LogInfoPagePage', () => {
  let component: LogInfoPagePage;
  let fixture: ComponentFixture<LogInfoPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInfoPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInfoPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
