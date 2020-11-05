import './StockStatus.css';
import React from 'react';
import { TStockQuote } from '../../../types/stock';
import { TStockStatus } from '../../../types/transaction';
import { CurrentCurrency } from '../../../ui/CurrentCurrency/CurrentCurrency';
import { SignedValue } from '../../../ui/SignedValue/SignedValue';
import { StockLogo } from '../StockLogo/StockLogo';

export type StockStatusProps = {
  status: TStockStatus;
  quote: TStockQuote;
};

export const StockStatus = React.memo(function StockStatus(props: StockStatusProps) {
  const { status, quote } = props;
  const balance = status.amount * quote.latestPrice;
  const cost = status.amount * status.averagePrice;
  const profit = balance - cost;

  return (
    <div className="stock-status bg-white shadow rounded">
      <div className="stock-status__titlebar">
        <StockLogo className="bg-light" symbol={status.symbol} />
        <div>
          <div className="font-weight-bold">{quote.companyName}</div>
          <div>{status.symbol.toUpperCase()}</div>
        </div>
        <div>
          <div>
            <CurrentCurrency>{balance}</CurrentCurrency>
          </div>
          <div>
            <SignedValue value={profit}>
              <CurrentCurrency>{profit}</CurrentCurrency>
            </SignedValue>
          </div>
        </div>
      </div>
      <div className="border-top px-3 pt-3 pb-1 d-flex justify-content-around">
        <span>
          Shares: <span className="font-weight-bold">{status.amount}</span>
        </span>
        <span>
          Avg price: <span className="font-weight-bold">{status.averagePrice}</span>
        </span>
        <span>
          Price: <span className="font-weight-bold">{quote.latestPrice}</span>
        </span>
      </div>
      <div className="px-3 pb-1 text-right">
        <div className="small">({quote.latestSource})</div>
      </div>
    </div>
  );
});
