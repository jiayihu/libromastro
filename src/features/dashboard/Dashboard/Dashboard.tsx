import './Dashboard.css';
import React, { useEffect, useMemo, useState } from 'react';
import { getStockQuotes } from '../../../services/stock';
import { TStockQuotesMap } from '../../../types/stock';
import {
  calculateDeposit,
  calculateLiquidity,
  calculateStockBalance,
  calculateStockStatus,
  isBankTransaction,
  isStockTransaction,
  TTransaction,
} from '../../../types/transaction';
import { CurrentCurrency } from '../../../ui/CurrentCurrency/CurrentCurrency';
import { Placeholder } from '../../../ui/Placeholder/Placeholder';
import { SignedValue } from '../../../ui/SignedValue/SignedValue';
import { StockStatus } from '../../stock/StockStatus/StockStatus';

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
      <div className="h3 my-2">
        <CurrentCurrency>{balance}</CurrentCurrency>
        <SignedValue value={profit} className="h6 ml-2">
          <CurrentCurrency>{profit}</CurrentCurrency>
        </SignedValue>
      </div>
      <div>
        Deposit: <CurrentCurrency>{deposit}</CurrentCurrency>
        {' - '}
        Liquidity: <CurrentCurrency>{liquidity}</CurrentCurrency>
      </div>

      <div className="stock-status-list">
        {nonZeroStockStatus.map((status) => (
          <StockStatus status={status} quote={quotes[status.symbol]} />
        ))}
      </div>
    </div>
  );
});
