import { TTickerDetails } from '../../types/ticker';

export const SET_TICKER_DETAILS = 'SET_TICKER_DETAILS';

export const setTickerDetails = (details: TTickerDetails) => {
  return {
    type: SET_TICKER_DETAILS,
    payload: details,
  } as const;
};

export type TickersAction = ReturnType<typeof setTickerDetails>;
