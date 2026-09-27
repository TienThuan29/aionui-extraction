/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useUi } from '../../../provider';
import { Button } from '@arco-design/web-react';

type FontSizeStepperProps = {
  /** Current size in px (controlled). */
  value: number;
  /** Smallest allowed value; the minus button disables there. */
  min: number;
  /** Largest allowed value; the plus button disables there. */
  max: number;
  /** Amount each button adds or removes. */
  step: number;
  /** Value the reset button restores. */
  defaultValue: number;
  /** Text of the reset button. */
  resetLabel: string;
  /** Called with the new value, already clamped to `min`–`max`. */
  onChange: (next: number) => void;
};

/** Integer-px font size stepper: − [value] + ↺ */
const FontSizeStepper: React.FC<FontSizeStepperProps> = ({
  value,
  min,
  max,
  step,
  defaultValue,
  resetLabel,
  onChange,
}) => {
  const { labels } = useUi();
  // Defensive bound only; the parent already clamps via clampFontSize before persisting.
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div className='flex items-center gap-10px ms-auto'>
      <Button
        size='mini'
        type='secondary'
        shape='circle'
        aria-label={labels.fontSizeDecrease}
        className='w-28px h-28px !min-w-28px flex items-center justify-center p-0'
        onClick={() => onChange(clamp(value - step))}
        disabled={value <= min}
      >
        -
      </Button>
      <span className='text-13px text-t-primary text-center min-w-32px' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </span>
      <Button
        size='mini'
        type='secondary'
        shape='circle'
        aria-label={labels.fontSizeIncrease}
        className='w-28px h-28px !min-w-28px flex items-center justify-center p-0'
        onClick={() => onChange(clamp(value + step))}
        disabled={value >= max}
      >
        +
      </Button>
      <Button
        size='small'
        type='text'
        className='px-4px h-28px'
        onClick={() => onChange(defaultValue)}
        disabled={value === defaultValue}
      >
        {resetLabel}
      </Button>
    </div>
  );
};

export default FontSizeStepper;
