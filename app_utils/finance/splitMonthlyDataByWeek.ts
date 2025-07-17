import { Data } from '@/types/data';
import { Transaction } from '@/types/transaction';
import { getWeekOfMonth } from '../calendar/getWeekOfMonth';

type Bundle = {
  week1: Transaction[];
  week2: Transaction[];
  week3: Transaction[];
  week4: Transaction[];
  week5: Transaction[];
  week6: Transaction[];
};

export const splitMonthlyDataByWeek = (data: Data | null, transactionType: 'E' | 'I') => {
  if (!data) return null;

  const monthlyTransactionsData = data.transactions;
  const week1: Transaction[] = [];
  const week2: Transaction[] = [];
  const week3: Transaction[] = [];
  const week4: Transaction[] = [];
  const week5: Transaction[] = [];
  const week6: Transaction[] = [];

  monthlyTransactionsData.forEach((item: Transaction) => {
    if (transactionType !== item.transactionType) return;

    const weekOfMonth = getWeekOfMonth(item.date);
    if (weekOfMonth === 1) {
      week1.push(item);
    } else if (weekOfMonth === 2) {
      week2.push(item);
    } else if (weekOfMonth === 3) {
      week3.push(item);
    } else if (weekOfMonth === 4) {
      week4.push(item);
    } else if (weekOfMonth === 5) {
      week5.push(item);
    } else if (weekOfMonth === 6) {
      week6.push(item);
    }
  });

  const result: Bundle = {
    week1: week1,
    week2: week2,
    week3: week3,
    week4: week4,
    week5: week5,
    week6: week6,
  };

  return result;
};
