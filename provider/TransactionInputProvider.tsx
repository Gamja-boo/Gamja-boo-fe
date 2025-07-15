import { TransactionInputContext } from '@/context/TransactionInputContext';
import React, { ReactNode, useState } from 'react';

type TransactionType = 'I' | 'E';

export const TransactionInputProvider = ({ children }: { children: ReactNode }) => {
  const [kakaoId, setKakaoId] = useState(1);
  const [categoryName, setCategoryName] = useState('');
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState<TransactionType>('E');
  const [background, setBackground] = useState('');
  const [date, setDate] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const [memo, setMemo] = useState('');

  return (
    <TransactionInputContext.Provider
      value={{
        kakaoId: kakaoId,
        setKakaoId: setKakaoId,
        categoryName: categoryName,
        setCategoryName: setCategoryName,
        amount: amount,
        setAmount: setAmount,
        transactionType: transactionType,
        setTransactionType: setTransactionType,
        background: background,
        setBackground: setBackground,
        date: date,
        setDate: setDate,
        isFixed: isFixed,
        setIsFixed: setIsFixed,
        memo: memo,
        setMemo: setMemo,
      }}
    >
      {children}
    </TransactionInputContext.Provider>
  );
};
