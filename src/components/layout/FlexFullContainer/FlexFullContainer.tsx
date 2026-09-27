/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import type { PropsWithChildren } from 'react';
import React from 'react';

import classNames from 'classnames';

const FlexFullContainer: React.FC<
  PropsWithChildren<{
    /** Class name of the outer flex item (`flex-1 relative min-h-0`). */
    className?: string;
    /** Class name of the inner absolutely-positioned box that fills the item. */
    containerClassName?: string;
  }>
> = (props) => {
  return (
    <div className={classNames('flex-1 relative min-h-0', props.className)}>
      <div className={classNames('absolute size-full', props.containerClassName)}>{props.children}</div>
    </div>
  );
};

export default FlexFullContainer;
