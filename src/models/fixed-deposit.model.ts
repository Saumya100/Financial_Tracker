export interface FixedDeposit {
    userId: string;
    place: string;
    investedAmt: number;
    maturityAmt: number;
    maturityDate: Date;
    purpose: string;
    isActive: boolean;
    createdOn: Date;
}