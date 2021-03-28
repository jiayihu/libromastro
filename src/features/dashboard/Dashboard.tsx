import React, { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { getStockQuotes } from '../../services/stock';
import { TStockQuotesMap } from '../../types/stock';
import {
  calculateDeposit,
  calculateLiquidity,
  calculateStockBalance,
  calculateStockStatus,
  isBankTransaction,
  isStockTransaction,
  TTransaction,
} from '../../types/transaction';
import { CurrentCurrency } from '../../ui/CurrentCurrency';
import { Placeholder } from '../../ui/Placeholder';
import { SignedValue } from '../../ui/SignedValue';
import { StockStatus } from '../stock/StockStatus';

export type DashboardProps = {
  transactions: TTransaction[];
};

export const Dashboard = React.memo(function Dashboard(props: DashboardProps) {
  const { transactions } = props;
  const [quotes, setQuotes] = useState<TStockQuotesMap | null>(null);

  const stockTransactions = useMemo(() => transactions.filter(isStockTransaction), [transactions]);
  const bankTransactions = useMemo(() => transactions.filter(isBankTransaction), [transactions]);

  const deposit = calculateDeposit(bankTransactions);
  const liquidity = calculateLiquidity(deposit, stockTransactions);
  const stockStatus = useMemo(() => calculateStockStatus(stockTransactions), [stockTransactions]);

  const nonZeroSymbols = useMemo(
    () =>
      Object.entries(stockStatus)
        .filter(([_, status]) => status.amount > 0)
        .map(([symbol]) => symbol),
    [stockStatus],
  );

  useEffect(() => {
    if (nonZeroSymbols.length) {
      getStockQuotes(nonZeroSymbols).then((quotes) => setQuotes(quotes));
    }
  }, [nonZeroSymbols]);

  if (!quotes) {
    return <Placeholder ready={false}>null</Placeholder>;
  }

  const nonZeroStockStatus = Object.values(stockStatus).filter((s) => s.amount > 0);
  const stockBalance = calculateStockBalance(nonZeroStockStatus, quotes);
  const balance = liquidity + stockBalance;
  const profit = balance - deposit;

  return (
    <div>
      <div className="">Total balance</div>
      <div className={css({ fontSize: '1.75rem', margin: '0.5rem 0' })}>
        <strong>
          <CurrentCurrency>{balance}</CurrentCurrency>
        </strong>
        <SignedValue value={profit} className={css({ fontSize: '1rem', marginLeft: '0.5rem' })}>
          <CurrentCurrency>{profit}</CurrentCurrency>
        </SignedValue>
      </div>
      <div>
        Deposit: <CurrentCurrency>{deposit}</CurrentCurrency>
        {' - '}
        Liquidity: <CurrentCurrency>{liquidity}</CurrentCurrency>
      </div>

      <div className={listStyle}>
        {nonZeroStockStatus.map((status) => (
          <StockStatus status={status} quote={quotes[status.symbol]} key={status.symbol} />
        ))}
      </div>
    </div>
  );
});

const listStyle = css({
  display: 'grid',
  gap: '1.5rem',
  gridAutoFlow: 'row',
  paddingTop: '2rem',
});
