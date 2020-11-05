import React from 'react';
import { assertNever } from '../utils';

export type DatetimeProps = {
  children: Date;
  type: 'date' | 'time' | 'datetime';
};

const formatDate = (type: 'date' | 'time' | 'datetime', date: Date) => {
  switch (type) {
    case 'date':
      return date.toLocaleDateString();
    case 'time':
      return date.toLocaleTimeString();
    case 'datetime':
      return date.toLocaleString();
    default:
      assertNever(type);
  }
};

export function Datetime(props: DatetimeProps) {
  return <span>{formatDate(props.type, props.children)}</span>;
}

Datetime.defaultProps = {
  type: 'datetime',
};
