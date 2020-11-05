import React from 'react';
import classnames from 'classnames';

export type SignedValueProps = React.HTMLAttributes<HTMLSpanElement> & {
  value: number;
};

export function SignedValue(props: SignedValueProps) {
  const { value, className, ...spanProps } = props;

  const cn = classnames(
    {
      'text-success': value > 0,
      'text-danger': value < 0,
    },
    className,
  );

  return (
    <span className={cn} {...spanProps}>
      {value > 0 ? '+' : '-'}
      {props.children}
    </span>
  );
}
