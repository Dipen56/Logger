import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPagePage } from './settings-page.page';

describe('SettingsPagePage', () => {
  let component: SettingsPagePage;
  let fixture: ComponentFixture<SettingsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
