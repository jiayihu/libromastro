import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrency } from '../store/reducers';
import { Currency, CurrencyProps } from './Currency';

export type CurrentCurrencyProps = Omit<CurrencyProps, 'name'>;

export function CurrentCurrency(props: CurrentCurrencyProps) {
  const name = useSelector(selectCurrency);

  return <Currency name={name} {...props} />;
}
