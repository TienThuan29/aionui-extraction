/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

// Locale-aware number formatting (adapted from AionUi services/i18n/format.ts).
// `locale` comes from <UiProvider locale>; apps resolve it to a language they ship.

const DEFAULT_LOCALE = 'en-US';

// `Intl.NumberFormat` construction is expensive relative to `format()`; cache per (locale, options).
const numberFormatCache = new Map<string, Intl.NumberFormat>();

function getNumberFormat(locale: string, options?: Intl.NumberFormatOptions): Intl.NumberFormat {
  const key = `${locale}|${JSON.stringify(options ?? {})}`;
  let formatter = numberFormatCache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    numberFormatCache.set(key, formatter);
  }
  return formatter;
}

const resolve = (locale?: string | null): string => (locale && locale.trim() ? locale : DEFAULT_LOCALE);

/** Format a plain number, e.g. `12.6` → `12,6` in de-DE. */
export function formatNumber(value: number, locale?: string | null, options?: Intl.NumberFormatOptions): string {
  return getNumberFormat(resolve(locale), options).format(value);
}

/**
 * Format a monetary amount. Falls back to `<number> <code>` when the currency code is not
 * renderable (`Intl.NumberFormat` throws a RangeError on malformed codes).
 */
export function formatCurrency(
  amount: number,
  currency: string,
  locale?: string | null,
  options?: Intl.NumberFormatOptions
): string {
  const resolved = resolve(locale);
  try {
    return getNumberFormat(resolved, { style: 'currency', currency, ...options }).format(amount);
  } catch {
    // Significant digits win over fraction digits in Intl, so honor them in the fallback too.
    const digits = options?.maximumFractionDigits ?? 4;
    const fallbackOptions: Intl.NumberFormatOptions =
      options?.maximumSignificantDigits != null
        ? { maximumSignificantDigits: options.maximumSignificantDigits }
        : { minimumFractionDigits: digits, maximumFractionDigits: digits };
    return `${getNumberFormat(resolved, fallbackOptions).format(amount)} ${currency}`;
  }
}

const BYTE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const;

/** Format a byte count as "12.5 MB" (binary units). */
export function formatByteSize(bytes: number, locale?: string | null, maximumFractionDigits = 1): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return `0 ${BYTE_UNITS[0]}`;
  }
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), BYTE_UNITS.length - 1);
  const value = bytes / 1024 ** exponent;
  return `${formatNumber(value, locale, { maximumFractionDigits })} ${BYTE_UNITS[exponent]}`;
}
