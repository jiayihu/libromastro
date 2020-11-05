import { roundDecimals } from '../utils';
import { DistributiveOmit } from '../utils/types.utils';
import { TStockQuotesMap } from './stock';

export type TCurrency = 'EUR' | 'USD';

export type TDeposit = {
  id: string;
  type: 'DEPOSIT';
  currency: TCurrency;
  date: Date;
  amount: number;
};

export type TWithdraw = {
  id: string;
  type: 'WITHDRAW';
  currency: TCurrency;
  date: Date;
  amount: number;
};

export type TBuy = {
  id: string;
  type: 'BUY';
  currency: TCurrency;
  date: Date;
  symbol: string;
  amount: number;
  price: number;
};

export type TSell = {
  id: string;
  type: 'SELL';
  currency: TCurrency;
  date: Date;
  symbol: string;
  amount: number;
  price: number;
};

export type TBankTransaction = TDeposit | TWithdraw;
export type TStockTransaction = TBuy | TSell;
export type TTransaction = TBankTransaction | TStockTransaction;

export type TTransactionPayload = DistributiveOmit<TTransaction, 'id'>;

export function isStockTransaction(transaction: TTransaction): transaction is TStockTransaction {
  return transaction.type === 'BUY' || transaction.type === 'SELL';
}

export function isBankTransaction(transaction: TTransaction): transaction is TBankTransaction {
  return transaction.type === 'DEPOSIT' || transaction.type === 'WITHDRAW';
}

export function getSymbols(transactions: TStockTransaction[]) {
  return Array.from(new Set(transactions.map((t) => t.symbol)));
}

export function calculateDeposit(transactions: TBankTransaction[]) {
  return transactions.reduce(
    (sum, t) => (t.type === 'DEPOSIT' ? sum + t.amount : sum - t.amount),
    0,
  );
}

export function calculateLiquidity(deposit: number, transactions: TStockTransaction[]) {
  return transactions.reduce((sum, t) => {
    const value = roundDecimals(t.amount * t.price);
    return t.type === 'BUY' ? roundDecimals(sum - value) : roundDecimals(sum + value);
  }, deposit);
}

export type TStockStatus = {
  symbol: string;
  currency: TCurrency;
  amount: number;
  averagePrice: number;
};

export type TStockStatusMap = { [symbol: string]: TStockStatus };

export function calculateStockStatus(transactions: TStockTransaction[]) {
  const sortedByDate = transactions.sort((t1, t2) => (t1.date > t2.date ? 1 : -1));

  const symbols = getSymbols(sortedByDate);
  const initialStatus = symbols.reduce<TStockStatusMap>((map, symbol) => {
    map[symbol] = {
      symbol,
      /** @TODO support multi-currency for the same stock */
      currency: transactions.find((t) => t.symbol === symbol)!.currency,
      amount: 0,
      averagePrice: 0,
    };
    return map;
  }, {});

  return sortedByDate.reduce<TStockStatusMap>((map, t) => {
    const status = map[t.symbol];

    if (t.type === 'BUY') {
      status.amount += t.amount;
      const delta = roundDecimals((t.price - status.averagePrice) / (status.amount / t.amount));
      status.averagePrice = roundDecimals(status.averagePrice + delta);
    }

    if (t.type === 'SELL') {
      status.amount = Math.max(status.amount - t.amount, 0);
      if (status.amount <= 0) status.averagePrice = 0;
    }

    return map;
  }, initialStatus);
}

export function calculateStockBalance(stockStatus: TStockStatus[], quotes: TStockQuotesMap) {
  return stockStatus.reduce((sum, status) => {
    const latestPrice = quotes[status.symbol].latestPrice;
    if (!latestPrice) throw new Error(`Cannot find the latest price for ${status.symbol}`);

    return roundDecimals(sum + status.amount * latestPrice);
  }, 0);
}
