import { TTransaction } from '../../types/transaction';

export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';

export const setTransactions = (transactions: TTransaction[]) => {
  return {
    type: SET_TRANSACTIONS,
    payload: transactions,
  } as const;
};

export type TransactionsAction = ReturnType<typeof setTransactions>;
