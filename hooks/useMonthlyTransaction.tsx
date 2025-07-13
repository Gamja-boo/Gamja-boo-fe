import { MonthlyTransactionContext } from '@/context/MonthlyTransactionsContext';
import { useContext } from 'react';

export const useMonthlyTransaction = () => {
  const context = useContext(MonthlyTransactionContext);
  if (!context) {
    throw new Error('There is no MonthlyTransactionContext.');
  }
  return context;
};
