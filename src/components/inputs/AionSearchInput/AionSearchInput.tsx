/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { CloseSmall, Search } from '@icon-park/react';
import classNames from 'classnames';
import type { CSSProperties, InputHTMLAttributes, Ref } from 'react';
import { useUi } from '../../../provider';
import React, { forwardRef } from 'react';
import styles from './AionSearchInput.module.css';

/**
 * AionSearchInput: the standard search bar (search icon, input, round clear button; 38px high,
 * 10px radius, primary-color focus ring). It only handles look and input; filtering, debouncing
 * and results stay with the caller.
 */
export type AionSearchInputProps = {
  /** Current value (controlled). */
  value: string;
  /** Called with the new string on every change. */
  onChange: (value: string) => void;
  /** Placeholder text. */
  placeholder?: string;
  /**
   * Show the clear button while there is a value.
   * @default true
   */
  allowClear?: boolean;
  /** Custom clear handler; by default clearing calls `onChange('')`. */
  onClear?: () => void;
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

const AionSearchInput = forwardRef<HTMLInputElement, AionSearchInputProps>((props, ref) => {
  const {
    value,
    onChange,
    placeholder,
    allowClear = true,
    onClear,
    className,
    style,
    autoFocus,
    disabled,
    wrapTestId,
    inputProps,
  } = props;
  const { labels } = useUi();

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  };

  return (
    <div className={classNames(styles.searchbar, className)} style={style} data-testid={wrapTestId}>
      <Search theme='outline' size='14' className={styles.icon} fill='currentColor' />
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
      {allowClear && value ? (
        <button type='button' className={styles.clearBtn} onClick={handleClear} aria-label={labels.clear} tabIndex={-1}>
          <CloseSmall theme='outline' size='14' fill='currentColor' />
        </button>
      ) : null}
    </div>
  );
});

AionSearchInput.displayName = 'AionSearchInput';

export default AionSearchInput;
