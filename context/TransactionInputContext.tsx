import React, { createContext } from 'react';

type TransactionType = 'I' | 'E';

type TransactionInputContextType = {
  kakaoId: number;
  setKakaoId: React.Dispatch<React.SetStateAction<number>>;
  categoryName: string;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  transactionType: TransactionType;
  setTransactionType: React.Dispatch<React.SetStateAction<TransactionType>>;
  background: string;
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  isFixed: boolean;
  setIsFixed: React.Dispatch<React.SetStateAction<boolean>>;
  memo: string;
  setMemo: React.Dispatch<React.SetStateAction<string>>;
};

export const TransactionInputContext = createContext<TransactionInputContextType | null>(null);
