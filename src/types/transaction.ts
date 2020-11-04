import { DistributiveOmit } from '../utils/types.utils';

export type TCurrency = 'EUR' | 'USD';

export type TDeposit = {
  id: string;
  type: 'DEPOSIT';
  currency: TCurrency;
  date: string;
  amount: number;
};

export type TWithdraw = {
  id: string;
  type: 'WITHDRAW';
  currency: TCurrency;
  date: string;
  amount: number;
};

export type TBuy = {
  id: string;
  type: 'BUY';
  currency: TCurrency;
  date: string;
  symbol: string;
  amount: number;
  price: number;
};

export type TSell = {
  id: string;
  type: 'SELL';
  currency: TCurrency;
  date: string;
  symbol: string;
  amount: number;
  price: number;
};

export type TTransaction = TDeposit | TWithdraw | TBuy | TSell;

export type TTransactionPayload = DistributiveOmit<TTransaction, 'id'>;

export function isStockTransaction(transaction: TTransaction): transaction is TBuy | TSell {
  return transaction.type === 'BUY' || transaction.type === 'SELL';
}
