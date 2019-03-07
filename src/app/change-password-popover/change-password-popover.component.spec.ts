import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordPopoverComponent } from './change-password-popover.component';

describe('ChangePasswordPopoverComponent', () => {
  let component: ChangePasswordPopoverComponent;
  let fixture: ComponentFixture<ChangePasswordPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
