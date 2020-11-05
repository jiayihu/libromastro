import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import { getTransactions } from '../../../services/transactions';
import { setTransactions } from '../../../store/actions/transactions.actions';
import { selectCurrency, selectTransactions } from '../../../store/reducers';
import { Placeholder } from '../../../ui/Placeholder/Placeholder';
import { Dashboard } from '../Dashboard/Dashboard';

export function DashboardShell() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const currency = useSelector(selectCurrency); /** @TODO Support choosing currency */

  useEffect(() => {
    getTransactions().then((transactions) => {
      dispatch(setTransactions(transactions));
    });
  }, [dispatch]);

  if (!transactions) {
    return <Placeholder ready={false}>null</Placeholder>;
  }

  const currencyTrans = transactions.filter((t) => t.currency === currency);

  return (
    <Container className="py-3 overflow-auto">
      <Dashboard transactions={currencyTrans} />
    </Container>
  );
}
