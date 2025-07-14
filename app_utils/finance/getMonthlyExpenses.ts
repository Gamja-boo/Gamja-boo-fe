import apiClient from '@/api/apiClient';
import { SpendingDetails } from '@/types/SpendingDetails';
import { Transaction } from '@/types/transaction';

type monthlyexpenses = SpendingDetails[];

export const getMonthlyExpenses = async (year: string, month: string): Promise<monthlyexpenses> => {
  const response = await apiClient.get(`/api/stats/monthly/${year}-${month}-01?kakaoId=1`);
  // Promise<AxiosResponse<T>> 형식 반환
  const monthlyData = response.data.data.transactions;
  console.log('response => ', response.data);
  console.log('monthlyData => ', monthlyData);
  // JS 객체로 파싱된 json 데이터
  const expenseMap = new Map();
  // [name: string, expenditure: number] 구조

  monthlyData.forEach((item: Transaction) => {
    if (expenseMap.has(item.categoryName)) {
      const currnetExpenditure = expenseMap.get(item.categoryName);
      if (item.categoryName === '고정') {
        console.log('currnetSum', currnetExpenditure + item.amount, item.background);
      }
      expenseMap.set(item.categoryName, currnetExpenditure + item.amount);
    } else {
      expenseMap.set(item.categoryName, item.amount);
    }
  });

  const monthlyExpenses: monthlyexpenses = [];
  expenseMap.forEach((value, key) => {
    monthlyExpenses.push({ categoryName: key, amount: value });
  });

  return monthlyExpenses;
};
