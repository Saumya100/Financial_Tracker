import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyExpenseEntryComponent } from './daily-expense-entry.component';

describe('DailyExpenseEntryComponent', () => {
  let component: DailyExpenseEntryComponent;
  let fixture: ComponentFixture<DailyExpenseEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyExpenseEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyExpenseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
