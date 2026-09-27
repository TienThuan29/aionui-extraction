/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search } from '@icon-park/react';
import classNames from 'classnames';
import type { CSSProperties, InputHTMLAttributes, Ref } from 'react';
import React, { forwardRef } from 'react';
import styles from './AionInlineSearchInput.module.css';

/**
 * AionInlineSearchInput: a light search field for the top of dropdown lists (gray fill, no border,
 * 8px radius). Use AionSearchInput for always-visible search bars and this one inside dropdowns.
 * Same value/onChange API as AionSearchInput; filtering stays with the caller.
 */
export type AionInlineSearchInputProps = {
  /** Current value (controlled). */
  value: string;
  /** Called with the new string on every change. */
  onChange: (value: string) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Extra class name on the wrapper. */
  className?: string;
  /** Inline style on the wrapper. */
  style?: CSSProperties;
  /** Focus the input on mount. */
  autoFocus?: boolean;
  /** Disable the input. */
  disabled?: boolean;
  /** Test id on the native input. */
  'data-testid'?: string;
  /** Test id on the wrapper. */
  wrapTestId?: string;
  /** Extra attributes for the native input (for example `onKeyDown`, `aria-label`). */
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'placeholder' | 'disabled' | 'autoFocus' | 'className'
  >;
};

const AionInlineSearchInput = forwardRef<HTMLInputElement, AionInlineSearchInputProps>((props, ref) => {
  const { value, onChange, placeholder, className, style, autoFocus, disabled, wrapTestId, inputProps } = props;

  return (
    <div className={classNames(styles.searchbar, className)} style={style} data-testid={wrapTestId}>
      <Search theme='outline' size='13' className={styles.icon} fill='currentColor' />
      <input
        {...inputProps}
        ref={ref as Ref<HTMLInputElement>}
        className={styles.input}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        data-testid={props['data-testid']}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
});

AionInlineSearchInput.displayName = 'AionInlineSearchInput';

export default AionInlineSearchInput;
