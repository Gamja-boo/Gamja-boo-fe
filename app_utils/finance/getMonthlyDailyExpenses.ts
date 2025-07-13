import apiClient from '@/api/apiClient';
import { Transaction } from '@/types/transaction';

interface list {
  date: string;
  background: string;
  amount: number;
}

type monthlyDailyExpenses = {
  categoryName: string;
  list: list[];
}[];

export const getMonthlyDailyExpenses = async (
  year: string,
  month: string,
): Promise<monthlyDailyExpenses> => {
  const response = await apiClient.get(`/api/stats/monthly/${year}-${month}-01?kakaoId=1`);
  const monthlyData = response.data.data.transactions;
  const expenseMap = new Map<string, list[]>();

  monthlyData.forEach((item: Transaction) => {
    const newItem: list = {
      date: item.date,
      background: item.background,
      amount: item.amount,
    };
    if (expenseMap.has(item.categoryName)) {
      const currnetlist = expenseMap.get(item.categoryName);
      expenseMap.set(item.categoryName, [...currnetlist!, newItem]);
    } else {
      expenseMap.set(item.categoryName, [newItem]);
    }
  });

  const monthlyDailyExpenses: monthlyDailyExpenses = [];
  expenseMap.forEach((value, key) => {
    monthlyDailyExpenses.push({ categoryName: key, list: value });
  });

  return monthlyDailyExpenses;
};
