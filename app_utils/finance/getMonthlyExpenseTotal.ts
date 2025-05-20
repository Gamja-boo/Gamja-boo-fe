import apiClient from '@/api/apiClient';
import { Transaction } from '@/types/Transaction';

export const getMonthlyExpenseTotal = async (year: string, month: string): Promise<number> => {
  const response = await apiClient.get(`/expenses?createdAt_like=${year}-${month}`); 
  const monthlyData: Transaction[] = response.data
  let sum = 0;

  monthlyData.forEach((item: Transaction) => {
    sum = sum + item.expenditure;
    console.log(sum);
  });

  return sum
}