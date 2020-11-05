import { TStockCompany } from '../../types/stock';
import { Action } from '../actions';
import { SET_STOCK_DETAILS } from '../actions/stock.actions';

export type TStockState = {
  [symbol: string]: TStockCompany | undefined;
};

export function stockReducer(state: TStockState = {}, action: Action): TStockState {
  switch (action.type) {
    case SET_STOCK_DETAILS:
      return {
        ...state,
        [action.payload.symbol]: action.payload,
      };
    default:
      return state;
  }
}
