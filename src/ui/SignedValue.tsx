import React from 'react';
import { css, cx } from 'emotion';

export type SignedValueProps = React.HTMLAttributes<HTMLSpanElement> & {
  value: number;
};

export function SignedValue(props: SignedValueProps) {
  const { value, className, ...spanProps } = props;

  const style = css({
    color: value >= 0 ? 'var(--success)' : 'var(--danger)',
  });

  const cn = cx(style, className);

  return (
    <span className={cn} {...spanProps}>
      {value > 0 ? '+' : '-'}
      {props.children}
    </span>
  );
}
