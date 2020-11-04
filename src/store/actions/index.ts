import { TickersAction } from './tickers';

type InitAction = { type: '@INIT' };

export type Action = InitAction | TickersAction;
