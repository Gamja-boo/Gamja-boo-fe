import { Data } from '@/types/data';
import { Transaction } from '@/types/transaction';

type Bundle = {
  categoryName: string;
  amountSum: number;
  transactions: Transaction[];
};

export const categorizeMonthlyData = (
  data: Data | null,
  transactionType: 'E' | 'I',
): Bundle[] | null => {
  if (!data) return null;

  const monthlyTransactionsData = data.transactions;
  const categoryAmountMap = new Map<string, number>();
  const categoryTransactionsMap = new Map<string, Transaction[]>();

  monthlyTransactionsData.forEach((item: Transaction) => {
    if (transactionType !== item.transactionType) return;

    const currentAmountValue = categoryAmountMap.get(item.categoryName) ?? 0;
    const currnetTransactionsValue = categoryTransactionsMap.get(item.categoryName) ?? [];
    categoryAmountMap.set(item.categoryName, currentAmountValue + item.amount);
    categoryTransactionsMap.set(item.categoryName, [...currnetTransactionsValue, item]);
  });

  const result: Bundle[] = [];

  categoryAmountMap.forEach((value, key) => {
    const bundle: Bundle = {
      categoryName: key,
      amountSum: value,
      transactions: categoryTransactionsMap.get(key)!,
    };

    result.push(bundle);
  });

  const sortedResult = result.sort((a, b) => b.amountSum - a.amountSum);

  return sortedResult;
};
