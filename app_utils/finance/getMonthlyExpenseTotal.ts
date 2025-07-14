import apiClient from '@/api/apiClient';
import { Transaction } from '@/types/transaction';

export const getMonthlyExpenseTotal = async (year: string, month: string): Promise<number> => {
  const response = await apiClient.get(`/api/stats/monthly/${year}-${month}-01?kakaoId=1`);
  const monthlyData: Transaction[] = response.data.data.transactions;
  let sum = 0;

  monthlyData.forEach((item) => {
    sum = sum + item.amount;
  });

  return sum;
};
