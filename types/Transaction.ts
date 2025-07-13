export interface Transaction {
  transactionId: number;
  kakaoId: number;
  categoryName: string;
  amount: number;
  transactionType: string;
  background: string;
  date: string;
  isFixed: boolean;
  memo: string;
}
