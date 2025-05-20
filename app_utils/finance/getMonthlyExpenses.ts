import apiClient from '@/api/apiClient';
import { SpendingDetails } from '@/types/SpendingDetails';
import { Transaction } from '@/types/Transaction';

type monthlyexpenses = SpendingDetails[];

export const getMonthlyExpenses = async (year: string, month: string): Promise<monthlyexpenses> => {
  const response = await apiClient.get(`/expenses?createdAt_like=${year}-${month}`); 
  // Promise<AxiosResponse<T>> 형식 반환
  const monthlyData = response.data
  // JS 객체로 파싱된 json 데이터 
  const expenseMap = new Map();
  // [name: string, expenditure: number] 구조

  monthlyData.forEach((item: Transaction) => {
    if (expenseMap.has(item.name)) {
      const currnetExpenditure = expenseMap.get(item.name);
      expenseMap.set(item.name, currnetExpenditure + item.expenditure);
    } else {
      expenseMap.set(item.name, item.expenditure);
    }
  });

  const monthlyExpenses: monthlyexpenses = [];
  expenseMap.forEach((value, key) => {
    monthlyExpenses.push({ name: key, expenditure: value });
  })

  return monthlyExpenses
}