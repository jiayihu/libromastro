import { TTickerDetails } from '../types/ticker';
import { requestIEXCloud } from './request';

export function getTickerDetails(symbol: string) {
  return requestIEXCloud<TTickerDetails>(`/stock/${symbol}/company`);
}

export function getTickerLogo(symbol: string) {
  return requestIEXCloud<{ url: string }>(`/stock/${symbol}/logo`).then((response) => response.url);
}
