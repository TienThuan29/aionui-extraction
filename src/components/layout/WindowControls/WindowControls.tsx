/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Minus, CloseSmall } from '@icon-park/react';

const WindowMaximizeIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox='0 0 18 18' fill='none' stroke='currentColor' strokeWidth='1.4'>
    <rect x='3.5' y='3.5' width='11' height='11' rx='1.2' />
  </svg>
);

const WindowRestoreIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox='0 0 18 18' fill='none' stroke='currentColor' strokeWidth='1.4'>
    <rect x='4.75' y='6.75' width='8' height='8' rx='1.1' />
    <path
      d='M6.5 5.25V4.5c0-.7.57-1.25 1.25-1.25h5c.69 0 1.25.56 1.25 1.25v5c0 .69-.56 1.25-1.25 1.25h-.7'
      strokeWidth='1.2'
    />
  </svg>
);

export type WindowControlsProps = {
  /** Current window state; switches the middle button between Maximize and Restore. */
  isMaximized: boolean;
  onMinimize: () => void;
  /** Maximize when restored, restore when maximized. */
  onToggleMaximize: () => void;
  onClose: () => void;
};

/** Minimize / maximize-restore / close buttons for frameless windows. The host owns window state. */
const WindowControls: React.FC<WindowControlsProps> = ({ isMaximized, onMinimize, onToggleMaximize, onClose }) => {
  return (
    <div className='app-window-controls'>
      <button type='button' className='app-window-controls__button' onClick={onMinimize} aria-label='Minimize'>
        <Minus theme='outline' size='14' fill='currentColor' strokeWidth={4} />
      </button>
      <button
        type='button'
        className='app-window-controls__button'
        onClick={onToggleMaximize}
        aria-label={isMaximized ? 'Restore' : 'Maximize'}
      >
        {isMaximized ? <WindowRestoreIcon size={14} /> : <WindowMaximizeIcon size={14} />}
      </button>
      <button
        type='button'
        className='app-window-controls__button app-window-controls__button--close'
        onClick={onClose}
        aria-label='Close'
      >
        <CloseSmall theme='outline' size='16' fill='currentColor' strokeWidth={3} />
      </button>
    </div>
  );
};

export default WindowControls;
