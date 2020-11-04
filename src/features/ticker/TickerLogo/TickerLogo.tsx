import React from 'react';

export type TickerLogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  symbol: string;
};

export function TickerLogo(props: TickerLogoProps) {
  const { symbol, ...imgProps } = props;

  return (
    <img
      src={`https://storage.googleapis.com/iex/api/logos/${symbol}.png`}
      alt={imgProps.alt}
      {...imgProps}
    />
  );
}
