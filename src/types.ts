/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

// Minimal data shapes the library renders; structurally compatible with AionUi's own types.

export type TokenUsageBreakdown = {
  input_tokens?: number;
  output_tokens?: number;
  thought_tokens?: number;
  cached_read_tokens?: number;
  cached_write_tokens?: number;
};

export type TokenUsageCost = {
  amount: number;
  /** ISO 4217 currency code, e.g. "USD" */
  currency: string;
};

export type TokenUsageData = {
  total_tokens: number;
  breakdown?: TokenUsageBreakdown;
  cost?: TokenUsageCost;
};

/** Content kinds a host preview surface can render (mirrors AionUi's preview types). */
export type PreviewContentType =
  | 'markdown'
  | 'diff'
  | 'code'
  | 'html'
  | 'pdf'
  | 'ppt'
  | 'word'
  | 'excel'
  | 'image'
  | 'csv'
  | 'unsupported'
  | 'url'
  | 'browser';
