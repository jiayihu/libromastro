import { TStockQuotesMap, TStockCompany, TStockQuote } from '../types/stock';
import { requestIEXCloud } from './request';

export function getStockDetails(symbol: string) {
  return requestIEXCloud<TStockCompany>(`/stock/${symbol}/company`);
}

export function getStockLogo(symbol: string) {
  return requestIEXCloud(`/stock/${symbol}/logo`).then((response) => response.url);
}

export function getStockQuotes(symbols: string[]): Promise<TStockQuotesMap> {
  const query = new URLSearchParams();

  query.set('types', 'quote');
  query.set('symbols', symbols.join(','));

  return requestIEXCloud<{ [symbol: string]: { quote: TStockQuote } }>(
    `/stock/market/batch`,
    query,
  ).then((result) => {
    return Object.fromEntries(Object.entries(result).map(([key, entry]) => [key, entry.quote]));
  });
}
