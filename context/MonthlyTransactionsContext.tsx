import { Data } from '@/types/Data';
import React, { createContext } from 'react';

type MonthlyTransactionContextType = {
  year: string;
  setYearToGetData: React.Dispatch<React.SetStateAction<string>>;
  yearlyData: (Data | null)[];
  setYearlyData: React.Dispatch<React.SetStateAction<(Data | null)[]>>;
};

export const MonthlyTransactionContext = createContext<MonthlyTransactionContextType | null>(null);
