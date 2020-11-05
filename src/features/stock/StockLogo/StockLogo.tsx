import './StockLogo.css';
import React from 'react';
import classnames from 'classnames';

export type StockLogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  symbol: string;
};

export function StockLogo(props: StockLogoProps) {
  const { symbol, className, ...divProps } = props;
  const cn = classnames('stock-logo', className);

  return (
    <div className={cn} {...divProps}>
      <img
        className="stock-logo__img"
        src={`https://storage.googleapis.com/iex/api/logos/${symbol}.png`}
        alt={symbol}
      />
    </div>
  );
}
