import { TCurrency } from '../../types/transaction';

export const SET_CURRENCY = 'SET_CURRENCY';

export const setCurrency = (currency: TCurrency) => {
  return {
    type: SET_CURRENCY,
    payload: currency,
  } as const;
};

export type CurrencyAction = ReturnType<typeof setCurrency>;
