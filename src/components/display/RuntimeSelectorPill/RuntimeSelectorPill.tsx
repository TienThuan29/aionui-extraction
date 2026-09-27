/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button } from '@arco-design/web-react';
import React from 'react';
import MarqueePillLabel from './MarqueePillLabel';

type RuntimeSelectorPillProps = Omit<
  React.ComponentPropsWithoutRef<typeof Button>,
  'children' | 'loading' | 'className' | 'disabled' | 'onClick' | 'shape' | 'size' | 'style'
> & {
  /** `data-testid` on the button. */
  testId?: string;
  /** Class name on the button (required: set the width limit here, for example `max-w-220px`). */
  className: string;
  /** Text; scrolls as a marquee on hover when it does not fit. */
  label?: string;
  /** Node before the label, for example a logo. */
  leading?: React.ReactNode;
  /** Node after the label, for example a chevron. Replaced by a spinner while `loading`. */
  trailing?: React.ReactNode;
  /**
   * Show a spinner in place of `trailing`.
   * @default false
   */
  loading?: boolean;
  /**
   * Disable the button.
   * @default false
   */
  disabled?: boolean;
  /** Click handler. */
  onClick?: () => void;
  /** Inline style on the button. */
  style?: React.CSSProperties;
};

export const RuntimeSelectorLoadingIndicator: React.FC = () => (
  <span
    data-testid='runtime-selector-loading-indicator'
    className='flex h-14px w-14px shrink-0 items-center justify-center leading-none text-t-secondary'
    aria-hidden='true'
  >
    <span
      data-testid='runtime-selector-loading-spinner'
      className='block h-12px w-12px animate-spin rounded-full'
      style={{
        border: '1.5px solid currentColor',
        borderRightColor: 'transparent',
      }}
    />
  </span>
);

const RuntimeSelectorPill = React.forwardRef<React.ElementRef<typeof Button>, RuntimeSelectorPillProps>(
  (
    { testId, className, label, leading, trailing, loading = false, disabled = false, onClick, style, ...buttonProps },
    ref
  ) => (
    <Button
      {...buttonProps}
      ref={ref}
      data-testid={testId}
      className={className}
      shape='round'
      size='small'
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      <span className='flex items-center gap-6px min-w-0 leading-none'>
        {leading}
        {label && <MarqueePillLabel>{label}</MarqueePillLabel>}
        {loading ? <RuntimeSelectorLoadingIndicator /> : trailing}
      </span>
    </Button>
  )
);

RuntimeSelectorPill.displayName = 'RuntimeSelectorPill';

export default RuntimeSelectorPill;
