import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositComponent } from './recurring-deposit.component';

describe('RecurringDepositComponent', () => {
  let component: RecurringDepositComponent;
  let fixture: ComponentFixture<RecurringDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurringDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
