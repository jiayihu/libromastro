import React from 'react';
import { css, cx } from '@emotion/css';

export type StockLogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  symbol: string;
};

export function StockLogo(props: StockLogoProps) {
  const { symbol, className, ...divProps } = props;
  const cn = cx(wrapperStyle, className);

  return (
    <div className={cn} {...divProps}>
      <img
        className={imgStyle}
        src={`https://storage.googleapis.com/iex/api/logos/${symbol}.png`}
        alt={symbol}
      />
    </div>
  );
}

const wrapperStyle = css({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  height: 50,
  overflow: 'hidden',
  textAlign: 'center',
  width: 50,
});

const imgStyle = css({
  width: '75%',
});
