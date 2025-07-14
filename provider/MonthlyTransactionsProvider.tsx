import apiClient from '@/api/apiClient';
import { MonthlyTransactionContext } from '@/context/MonthlyTransactionsContext';
import { Data } from '@/types/Data';
import { ReactNode, useEffect, useState } from 'react';

const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const getData = async (year: string, month: string): Promise<Data | null> => {
  try {
    const response = await apiClient.get(`/api/stats/monthly/${year}-${month}-01?kakaoId=1`);
    console.log(`요청 성공 (${year}-${month}): `, response.data.data);
    return response.data.data;
  } catch (error) {
    console.warn(`요청 실패 (${year}-${month}): `, error);
    return null;
  }
};

export const MonthlyTransactionProvider = ({ children }: { children: ReactNode }) => {
  const [year, setYearToGetData] = useState(new Date().getFullYear().toString());
  const [yearlyData, setYearlyData] = useState<(Data | null)[]>([]);

  useEffect(() => {
    const execute = async () => {
      const result: (Data | null)[] = [];

      for (const month of months) {
        const data = await getData(year, month);
        result.push(data);
      }

      setYearlyData(result);
    };
    execute();
  }, [year]);

  return (
    <MonthlyTransactionContext.Provider
      value={{ year, setYearToGetData, yearlyData, setYearlyData }}
    >
      {children}
    </MonthlyTransactionContext.Provider>
  );
};
