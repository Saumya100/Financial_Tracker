export interface DailyExpense {
    userId: string;
    monthYear?: number;
    date: Date | string;
    grocery?: number;
    vegitable?: number;
    meat?: number;
    mobile?: number;
    transport?: number;
    bike?: number;
    shopping?: number;
    food?: number;
    room?: number;
    medical?: number;
    study?: number;
    other?: number;
    calculationRow: boolean;
}