import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPagePage } from './signup-page.page';

describe('SignupPagePage', () => {
  let component: SignupPagePage;
  let fixture: ComponentFixture<SignupPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
