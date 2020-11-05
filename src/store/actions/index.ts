import { CurrencyAction } from './currency.actions';
import { StockAction } from './stock.actions';
import { TransactionsAction } from './transactions.actions';

type InitAction = { type: '@INIT' };

export type Action = InitAction | StockAction | TransactionsAction | CurrencyAction;
