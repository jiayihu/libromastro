import React from 'react';
import { TCurrency } from '../../types/transaction';
import { assertNever } from '../../utils';

export type CurrencyProps = {
  name: TCurrency;
  children?: number;
};

const currencyToString = (name: TCurrency) => {
  switch (name) {
    case 'EUR':
      return '€';
    case 'USD':
      return '$';
    default:
      assertNever(name);
  }
};

export function Currency(props: CurrencyProps) {
  return (
    <span>
      {props.children !== undefined
        ? props.children?.toLocaleString(undefined, {
            style: 'currency',
            currencyDisplay: 'narrowSymbol',
            currency: props.name,
          })
        : currencyToString(props.name)}
    </span>
  );
}
