import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPagePage } from './dashboard-page.page';

describe('DashboardPagePage', () => {
  let component: DashboardPagePage;
  let fixture: ComponentFixture<DashboardPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
