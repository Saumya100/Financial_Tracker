import { OtherInvestment } from './other-investment';

export interface ConsolidateInvestmentReport extends OtherInvestment{
    monthYear: string;
    equityInvested: number;
    equityCurrent: number;
    mfInvested: number;
    mfCurrent: number;
    fixedDeposit: number;
    recurringDeposit: number;
}