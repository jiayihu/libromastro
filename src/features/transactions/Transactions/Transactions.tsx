import './Transactions.css';
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { getTransactions, postTransaction } from '../../../services/transactions';
import { TTransaction, TTransactionPayload } from '../../../types/transaction';
import { Placeholder } from '../../../ui/Placeholder/Placeholder';
import { AddTransaction } from '../AddTransaction/AddTransaction';
import { Transaction } from '../Transaction/Transaction';

export function Transactions() {
  const [transactions, setTransactions] = useState<null | TTransaction[]>(null);

  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, []);

  const handleAddTransaction = (transaction: TTransactionPayload) => {
    postTransaction(transaction).then((result) => {
      if (result) setTransactions([result, ...transactions]);
    });
  };

  return (
    <div className="transactions-page">
      <Container className="bg-white rounded py-3 overflow-auto">
        <Placeholder ready={transactions !== null}>
          {() => (
            <div className="transactions">
              {transactions?.map((transaction) => (
                <Transaction transaction={transaction} key={transaction.date} />
              ))}
            </div>
          )}
        </Placeholder>
      </Container>
      <Container className="py-3">
        <AddTransaction onSubmit={handleAddTransaction} />
      </Container>
    </div>
  );
}
