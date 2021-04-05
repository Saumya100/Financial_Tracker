import { DailyExpense } from './daily-expense-entry.model';

export class Constant {
    public static readonly MONTHS = [
        {value: 1, text: "JAN", days: 31},
        {value: 2, text: "FEB", days: 31},
        {value: 3, text: "MAR", days: 31},
        {value: 4, text: "APR", days: 31},
        {value: 5, text: "MAY", days: 31},
        {value: 6, text: "JUN", days: 31},
        {value: 7, text: "JUL", days: 31},
        {value: 8, text: "AUG", days: 31},
        {value: 9, text: "SEP", days: 31},
        {value: 10, text: "OCT", days: 31},
        {value: 11, text: "NOV", days: 31},
        {value: 12, text: "DEC", days: 31},
    ];

    public static readonly OTHER_INVESTMENTS = ['SSY', 'PF', 'Cash', 'Other'];
    public static readonly MF_PLATFORMS = ['Coin', 'Smallcase', 'Encompass', 'Other'];

    public static readonly LIMIT_EXPENSE_TOTAL: DailyExpense = {
        userId: '',
        date: 'Limit', grocery: 5000, vegitable: 2500, meat: 2500, mobile: 1200, transport: 1000, bike: 1800,
        shopping: 3000, food: 1500, other: 1000, room: 12000, medical: 500, study: 3000, calculationRow: true
    }
}

