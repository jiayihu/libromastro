import { TTransaction } from '../../types/transaction';
import { Action } from '../actions';
import { SET_TRANSACTIONS } from '../actions/transactions.actions';

export type TTransactionsState = TTransaction[] | null;

export function transactionsReducer(
  state: TTransactionsState = null,
  action: Action,
): TTransactionsState {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return action.payload;
    default:
      return state;
  }
}
