import { TTickerDetails } from '../../types/ticker';
import { Action } from '../actions';

export type TickersState = {
  [symbol: string]: TTickerDetails | undefined;
};

export function tickersReducer(state: TickersState = {}, action: Action): TickersState {
  switch (action.type) {
    case 'SET_TICKER_DETAILS':
      return {
        ...state,
        [action.payload.symbol]: action.payload,
      };
    default:
      return state;
  }
}
