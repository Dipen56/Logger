import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDetailPageComponent } from './log-detail-page.component';

describe('LogDetailPageComponent', () => {
  let component: LogDetailPageComponent;
  let fixture: ComponentFixture<LogDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
