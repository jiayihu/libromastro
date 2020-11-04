import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import { Props } from 'react-placeholder/lib/ReactPlaceholder';

export type PlaceholderProps = Props & {
  children: React.ReactNode;
};

export function Placeholder(props: PlaceholderProps) {
  return (
    <ReactPlaceholder {...props}>
      {props.ready
        ? typeof props.children === 'function'
          ? props.children()
          : props.children
        : null}
    </ReactPlaceholder>
  );
}
