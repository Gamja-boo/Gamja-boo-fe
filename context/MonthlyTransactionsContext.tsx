import { Data } from '@/types/data';
import React, { createContext } from 'react';

type MonthlyTransactionContextType = {
  year: string;
  setYearToGetData: React.Dispatch<React.SetStateAction<string>>;
  yearlyData: (Data | null)[];
  setYearlyData: React.Dispatch<React.SetStateAction<(Data | null)[]>>;
  isDataUpdated: boolean;
  setIsDataUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MonthlyTransactionContext = createContext<MonthlyTransactionContextType | null>(null);
