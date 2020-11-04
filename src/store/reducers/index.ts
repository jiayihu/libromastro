import { combineReducers } from 'redux';
import { Action } from '../actions';
import { tickersReducer, TickersState } from './tickers';

export type StoreState = {
  tickers: TickersState;
};

export const reducer = combineReducers<StoreState, Action>({
  tickers: tickersReducer,
});

export const selectTickerDetails = (symbol: string) => (state: StoreState) => {
  return state.tickers[symbol];
};
