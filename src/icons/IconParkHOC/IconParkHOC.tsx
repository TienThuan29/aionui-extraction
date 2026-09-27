/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { IconProvider, DEFAULT_ICON_CONFIGS } from '@icon-park/react/es/runtime';
import { iconColors } from '../../tokens/colors';

type IconParkProps = {
  className?: string;
  strokeWidth?: number;
  fill?: string;
};

/**
 * Like IconParkHOC, but resolves the icon on render instead of at module load.
 * The build-time icon transform emits this so importing a component never reads
 * icon bindings it may not render (e.g. partially mocked `@icon-park/react` in tests).
 */
export const lazyIconParkHOC = <T extends object>(
  getComponent: () => React.FunctionComponent<T>
): React.FC<T & IconParkProps> => {
  return (props) => {
    const { className, ...restProps } = props;
    return React.createElement(
      IconProvider,
      {
        value: {
          ...DEFAULT_ICON_CONFIGS,
          size: 16,
        },
      },
      [
        React.createElement(getComponent(), {
          key: 'c3',
          strokeWidth: 3,
          fill: iconColors.secondary,
          ...(restProps as T),
          className: `cursor-pointer  ${className || ''}`,
        } as T),
      ]
    );
  };
};

const IconParkHOC = <T extends object>(Component: React.FunctionComponent<T>): React.FC<T & IconParkProps> =>
  lazyIconParkHOC(() => Component);

export default IconParkHOC;
