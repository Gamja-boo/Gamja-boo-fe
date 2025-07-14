import { Transaction } from './transaction';

export interface Data {
  startDate: string;
  endDate: string;
  totalSpent: number;
  totalIncome: number;
  transactions: Transaction[];
}
