/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from 'react';

export interface MobileActionSheetOption {
  key: string;
  label: ReactNode;
  description?: ReactNode;
  /** Selected (radio/checkbox checked). */
  active?: boolean;
}

export interface MobileActionSheetSubMenu {
  title: ReactNode;
  options: MobileActionSheetOption[];
  /** Called with the tapped option's key. */
  onSelect: (key: string) => void;
  /** Shown when `options` is empty. */
  emptyText?: ReactNode;
  /** When false, options behave as plain action rows (no radio). Default: true. */
  selectable?: boolean;
  /**
   * When true, options are multi-select checkboxes (driven by `option.active`).
   * Tapping toggles a selection via `onSelect` but keeps the submenu open so the
   * user can toggle several in a row (used for Skills / MCP on the home page).
   */
  multiSelect?: boolean;
}

export interface MobileActionSheetEntry {
  key: string;
  icon?: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  /** Right-side hint, e.g. current model label */
  meta?: ReactNode;
  /** Visual style — `muted` reduces icon emphasis (use for actions, not stateful selectors) */
  variant?: 'primary' | 'muted';
  /** Optional divider above this entry */
  dividerBefore?: boolean;
  /** If provided, tapping opens a submenu */
  submenu?: MobileActionSheetSubMenu;
  /** If provided, tapping triggers this action and closes the sheet */
  onClick?: () => void;
  disabled?: boolean;
}

export interface MobileActionSheetProps {
  /** Whether the sheet is shown (controlled). */
  open: boolean;
  /** Called on backdrop tap, after an entry's `onClick`, and after a single-select choice. */
  onClose: () => void;
  /** Title at the top of the sheet. */
  title?: ReactNode;
  /** Rows; an entry with `submenu` opens a second level, one with `onClick` runs and closes. */
  entries: MobileActionSheetEntry[];
}
