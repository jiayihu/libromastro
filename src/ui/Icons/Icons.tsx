import React from 'react';
import bootstrapSvg from 'bootstrap-icons/bootstrap-icons.svg';

export type IconsProps = {
  name: string;
};

export function Icons(props: IconsProps) {
  const { name, ...svgProps } = props;

  return (
    <svg className="bi" width="24" height="24" fill="currentColor" {...svgProps}>
      <use xlinkHref={`${bootstrapSvg}#${name}`} />
    </svg>
  );
}
