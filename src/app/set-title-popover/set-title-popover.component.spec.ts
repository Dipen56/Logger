import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTitlePopoverComponent } from './set-title-popover.component';

describe('SetTitlePopoverComponent', () => {
  let component: SetTitlePopoverComponent;
  let fixture: ComponentFixture<SetTitlePopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetTitlePopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTitlePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
