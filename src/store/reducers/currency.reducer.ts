import { TCurrency } from '../../types/transaction';
import { Action } from '../actions';
import { SET_CURRENCY } from '../actions/currency.actions';

export type TCurrencyState = TCurrency;

export function currencyReducer(state: TCurrencyState = 'USD', action: Action): TCurrencyState {
  switch (action.type) {
    case SET_CURRENCY:
      return action.payload;
    default:
      return state;
  }
}
