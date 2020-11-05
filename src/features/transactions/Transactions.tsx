import React, { useEffect } from 'react';
import { css } from 'emotion';
import { Container } from 'reactstrap';
import { getTransactions, postTransaction } from '../../services/transactions';
import { TTransactionPayload } from '../../types/transaction';
import { Placeholder } from '../../ui/Placeholder';
import { AddTransaction } from './AddTransaction';
import { Transaction } from './Transaction';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactions } from '../../store/actions/transactions.actions';
import { selectTransactions } from '../../store/reducers';

export function Transactions() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    getTransactions().then((transactions) => {
      dispatch(setTransactions(transactions));
    });
  }, [dispatch]);

  const handleAddTransaction = (transaction: TTransactionPayload) => {
    postTransaction(transaction).then((result) => {
      if (result) dispatch(setTransactions([result, ...transactions]));
    });
  };

  return (
    <div className={pageStyle}>
      <Container className="bg-white rounded py-3 overflow-auto">
        <Placeholder ready={transactions !== null}>
          {() => (
            <div className={listStyle}>
              {transactions?.map((transaction) => (
                <Transaction transaction={transaction} key={transaction.id} />
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

const pageStyle = css({
  display: 'grid',
  gridAutoRows: '1fr auto',
  overflow: 'auto',
});

const listStyle = css({
  display: 'grid',
  gap: '1.5rem',
  gridTemplateRows: 'auto',
});
