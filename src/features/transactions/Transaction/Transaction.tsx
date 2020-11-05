import './Transaction.css';
import React from 'react';
import { isStockTransaction, TTransaction } from '../../../types/transaction';
import { Currency } from '../../../ui/Currency/Currency';
import { Datetime } from '../../../ui/Datetime/Datetime';
import { StockLogo } from '../../stock/StockLogo/StockLogo';
import bankTransactionImg from 'bootstrap-icons/icons/arrow-left-right.svg';

export type TransactionProps = {
  transaction: TTransaction;
};

export function Transaction(props: TransactionProps) {
  const { transaction } = props;

  return (
    <div className="transaction">
      {isStockTransaction(transaction) ? (
        <StockLogo className="shadow" symbol={transaction.symbol} alt={transaction.symbol} />
      ) : (
        <img src={bankTransactionImg} alt="" width="24" />
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
