import { TransactionInputContext } from '@/context/TransactionInputContext';
import { useContext } from 'react';

export const useTransactionInput = () => {
  const context = useContext(TransactionInputContext);
  if (!context) {
    throw new Error('There is no TransactionInputContext.');
  }
  return context;
};
