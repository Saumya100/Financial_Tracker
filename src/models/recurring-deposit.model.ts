export interface RecurringDeposit {
    userId: string;
    year: number;
    month: number;
    place: string;
    investedAmt: number;
    currentAmt: number;
    maturityAmt: number;
    maturityDate: Date;
    purpose: string;
    isActive: boolean;
    createdOn: Date;
}