import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherInvestmentComponent } from './other-investment.component';

describe('OtherInvestmentComponent', () => {
  let component: OtherInvestmentComponent;
  let fixture: ComponentFixture<OtherInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
