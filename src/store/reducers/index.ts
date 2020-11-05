import { combineReducers } from 'redux';
import { Action } from '../actions';
import { currencyReducer, TCurrencyState } from './currency.reducer';
import { stockReducer, TStockState } from './stock.reducer';
import { transactionsReducer } from './transactions.reducer';
import { TTransactionsState } from './transactions.reducer';

export type TStoreState = {
  stock: TStockState;
  transactions: TTransactionsState;
  currency: TCurrencyState;
};

export const reducer = combineReducers<TStoreState, Action>({
  stock: stockReducer,
  transactions: transactionsReducer,
  currency: currencyReducer,
});

export const selectStockDetails = (symbol: string) => (state: TStoreState) => {
  return state.stock[symbol];
};

export const selectTransactions = (state: TStoreState) => {
  return state.transactions;
};

export const selectCurrency = (state: TStoreState) => {
  return state.currency;
};
