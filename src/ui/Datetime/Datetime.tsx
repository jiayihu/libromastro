import React from 'react';
import { assertNever } from '../../utils';

export type DatetimeProps = {
  children: string;
  type: 'date' | 'time' | 'datetime';
};

const formatDate = (type: 'date' | 'time' | 'datetime', date: string) => {
  switch (type) {
    case 'date':
      return new Date(date).toLocaleDateString();
    case 'time':
      return new Date(date).toLocaleTimeString();
    case 'datetime':
      return new Date(date).toLocaleString();
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
