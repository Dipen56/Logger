import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverExitSelectallComponent } from './popover-exit-selectall.component';

describe('PopoverExitSelectallComponent', () => {
  let component: PopoverExitSelectallComponent;
  let fixture: ComponentFixture<PopoverExitSelectallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverExitSelectallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverExitSelectallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
