import { TStockCompany } from '../../types/stock';

export const SET_STOCK_DETAILS = 'SET_STOCK_DETAILS';

export const setStockDetails = (details: TStockCompany) => {
  return {
    type: SET_STOCK_DETAILS,
    payload: details,
  } as const;
};

export type StockAction = ReturnType<typeof setStockDetails>;
