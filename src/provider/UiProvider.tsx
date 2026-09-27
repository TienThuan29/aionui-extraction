/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useMemo } from 'react';
import { defaultLabels, type UiLabels } from './defaultLabels';

export type UiTheme = 'light' | 'dark';

export type UiContextValue = {
  labels: UiLabels;
  /** Touch/narrow layout: disables hover-only affordances. */
  isMobile: boolean;
  /** Global UI scale factor applied by components that size themselves in JS (e.g. AionModal). */
  fontScale: number;
  theme: UiTheme;
  /** BCP 47 locale for number/currency/byte formatting. */
  locale: string;
};

const defaultValue: UiContextValue = {
  labels: defaultLabels,
  isMobile: false,
  fontScale: 1,
  theme: 'light',
  locale: 'en-US',
};

const UiContext = createContext<UiContextValue>(defaultValue);

export type UiProviderProps = {
  labels?: Partial<UiLabels>;
  isMobile?: boolean;
  fontScale?: number;
  theme?: UiTheme;
  locale?: string;
  children?: React.ReactNode;
};

/** Supplies labels and environment to library components. Optional: every value has a default. */
export const UiProvider: React.FC<UiProviderProps> = ({ labels, isMobile, fontScale, theme, locale, children }) => {
  const parent = useContext(UiContext);
  const value = useMemo<UiContextValue>(
    () => ({
      labels: labels ? { ...parent.labels, ...labels } : parent.labels,
      isMobile: isMobile ?? parent.isMobile,
      fontScale: fontScale ?? parent.fontScale,
      theme: theme ?? parent.theme,
      locale: locale ?? parent.locale,
    }),
    [parent, labels, isMobile, fontScale, theme, locale]
  );
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export const useUi = (): UiContextValue => useContext(UiContext);
