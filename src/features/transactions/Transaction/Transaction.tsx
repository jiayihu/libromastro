import './Transaction.css';
import React from 'react';
import { isStockTransaction, TTransaction } from '../../../types/transaction';
import { Currency } from '../../../ui/Currency/Currency';
import { Datetime } from '../../../ui/Datetime/Datetime';
import { TickerLogo } from '../../ticker/TickerLogo/TickerLogo';
import bankTransactionImg from 'bootstrap-icons/icons/arrow-left-right.svg';

export type TransactionProps = {
  transaction: TTransaction;
};

export function Transaction(props: TransactionProps) {
  const { transaction } = props;

  return (
    <div className="transaction">
      {isStockTransaction(transaction) ? (
        <TickerLogo
          symbol={transaction.symbol}
          className="rounded-lg shadow"
          alt={transaction.symbol}
          width="50"
        />
      ) : (
        <div className="text-center">
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
