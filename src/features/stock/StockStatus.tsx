import React from 'react';
import { css, cx } from '@emotion/css';
import { TStockQuote } from '../../types/stock';
import { TStockStatus } from '../../types/transaction';
import { CurrentCurrency } from '../../ui/CurrentCurrency';
import { SignedValue } from '../../ui/SignedValue';
import { StockLogo } from './StockLogo';

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
    <div
      className={cx(css({ backgroundColor: 'var(--white)', borderRadius: '0.25rem' }), 'shadow')}
    >
      <div className={titlebarStyle}>
        <StockLogo className={css({ backgroundColor: 'var(--light)' })} symbol={status.symbol} />
        <div>
          <div>
            <strong>{quote.companyName}</strong>
          </div>
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
      <div className={statsStyle}>
        <span>
          Shares: <strong>{status.amount}</strong>
        </span>
        <span>
          Avg price: <strong>{status.averagePrice}</strong>
        </span>
        <span>
          Price: <strong>{quote.latestPrice}</strong>
        </span>
      </div>
      <div className={css({ padding: '0 1rem 0.5rem', textAlign: 'right' })}>
        <div className="small">({quote.latestSource})</div>
      </div>
    </div>
  );
});

const titlebarStyle = css({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'auto 1fr auto',
  padding: '1rem',
});

const statsStyle = css({
  borderTop: '1px solid #dee2e6',
  display: 'flex',
  justifyContent: 'space-around',
  padding: '1rem 1rem 0.25rem',
});
