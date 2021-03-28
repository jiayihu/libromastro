import React from 'react';
import { css } from 'emotion';
import { isStockTransaction, TTransaction } from '../../types/transaction';
import { Currency } from '../../ui/Currency';
import { Datetime } from '../../ui/Datetime';
import { StockLogo } from '../stock/StockLogo';
import bankTransactionImg from 'bootstrap-icons/icons/arrow-left-right.svg';

export type TransactionProps = {
  transaction: TTransaction;
  onSelect: (transaction: TTransaction) => void;
};

export function Transaction(props: TransactionProps) {
  const { transaction, onSelect } = props;

  return (
    <div className={wrapperStyle} onClick={() => onSelect(transaction)}>
      {isStockTransaction(transaction) ? (
        <StockLogo
          className={css({ backgroundColor: 'var(--light)' })}
          symbol={transaction.symbol}
          alt={transaction.symbol}
        />
      ) : (
        <div className={bankLogoStyle}>
          <img src={bankTransactionImg} alt="" width="24" />
        </div>
      )}
      <div>
        {isStockTransaction(transaction) ? (
          <>
            <div className={css({ fontWeight: 'bold' })}>
              <strong>
                {transaction.type} {transaction.symbol}
              </strong>
            </div>
            <div>
              {transaction.amount} shares,{' '}
              <Currency name={transaction.currency}>{transaction.price}</Currency>
            </div>
          </>
        ) : (
          <>
            <div className={css({ fontWeight: 'bold' })}>{transaction.type}</div>
            <div>
              <Currency name={transaction.currency}>{transaction.amount}</Currency>
            </div>
          </>
        )}
      </div>
      <div className={css({ textAlign: 'right' })}>
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

const bankLogoStyle = css({
  alignItems: 'center',
  backgroundColor: 'var(--light)',
  borderRadius: '0.25rem',
  display: 'flex',
  justifyContent: 'center',
  height: 50,
  textAlign: 'center',
  width: 50,
});
