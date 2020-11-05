import React from 'react';
import { css } from 'emotion';
import { isStockTransaction, TTransaction } from '../../types/transaction';
import { Currency } from '../../ui/Currency';
import { Datetime } from '../../ui/Datetime';
import { StockLogo } from '../stock/StockLogo';
import bankTransactionImg from 'bootstrap-icons/icons/arrow-left-right.svg';

export type TransactionProps = {
  transaction: TTransaction;
};

export function Transaction(props: TransactionProps) {
  const { transaction } = props;

  return (
    <div className={wrapperStyle}>
      {isStockTransaction(transaction) ? (
        <StockLogo className="bg-light" symbol={transaction.symbol} alt={transaction.symbol} />
      ) : (
        <div className="bg-light rounded text-center">
          <img src={bankTransactionImg} alt="" width="24" />
        </div>
      )}
      <div>
        {isStockTransaction(transaction) ? (
          <>
            <div className="font-weight-bold">
              {transaction.type} {transaction.symbol}
            </div>
            <div>
              {transaction.amount} shares,{' '}
              <Currency name={transaction.currency}>{transaction.price}</Currency>
            </div>
          </>
        ) : (
          <>
            <div className="font-weight-bold">{transaction.type}</div>
            <div>
              <Currency name={transaction.currency}>{transaction.amount}</Currency>
            </div>
          </>
        )}
      </div>
      <div className="text-right">
        <div className="h6">
          {transaction.type === 'DEPOSIT' || transaction.type === 'SELL' ? '+' : '-'}{' '}
          <Currency name={transaction.currency}>
            {isStockTransaction(transaction)
              ? transaction.price * transaction.amount
              : transaction.amount}
          </Currency>
        </div>
        <div className="">
          <Datetime type="date">{transaction.date}</Datetime>
        </div>
      </div>
    </div>
  );
}

const wrapperStyle = css({
  alignItems: 'center',
  display: 'grid',
  gap: '1.5rem',
  gridTemplateColumns: '1fr 2fr 2fr',
});
