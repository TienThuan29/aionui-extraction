/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useMemo } from 'react';
import type { PreviewContentType } from '../types';

/** What a diff card asks the host to open in its preview surface. */
/** What Diff2Html passes to `onPreviewDiff`. */
export type DiffPreviewRequest = {
  relativePath: string;
  originalPath?: string;
  file_name: string;
  title: string;
  language: string;
  contentType: PreviewContentType;
  editable: boolean;
  fallbackContent?: string;
  diffContent: string;
};

/**
 * Host integrations for the markdown renderers. Every entry is optional: a missing
 * callback hides the feature it powers (never breaks it), and links fall back to window.open.
 */
export type MarkdownHostValue = {
  /** Open an http(s) or other link. Default: `window.open(href, '_blank', 'noopener')`. */
  onOpenLink?: (href: string) => void;
  /** Open diagram source in the host's preview panel; hides the "open in panel" button when absent. */
  onOpenPreview?: (content: string, options: { title: string }) => void;
  /** Render images whose src is a local path. Default: a plain <img>. */
  renderLocalImage?: (image: { src: string; alt: string; className?: string }) => React.ReactNode;
  /** Theme CSS injected into markdown shadow roots (made `!important`). */
  customCss?: string;
  /** Open a diff card's file in the host's preview surface; hides the preview button when absent. */
  onPreviewDiff?: (request: DiffPreviewRequest) => void;
  /** True while the host is opening a diff preview (disables the button). */
  diffPreviewLoading?: boolean;
};

const MarkdownHostContext = createContext<MarkdownHostValue>({});

/** Nested providers merge: inner values override outer ones, unspecified keys inherit. */
export const MarkdownHostProvider: React.FC<
  MarkdownHostValue & {
    /** Markdown renderers that use these values. */
    children?: React.ReactNode;
  }
> = ({ children, ...value }) => {
  const parent = useContext(MarkdownHostContext);
  const { onOpenLink, onOpenPreview, renderLocalImage, customCss, onPreviewDiff, diffPreviewLoading } = value;
  const merged = useMemo<MarkdownHostValue>(() => {
    const next: MarkdownHostValue = { ...parent };
    if (onOpenLink !== undefined) next.onOpenLink = onOpenLink;
    if (onOpenPreview !== undefined) next.onOpenPreview = onOpenPreview;
    if (renderLocalImage !== undefined) next.renderLocalImage = renderLocalImage;
    if (customCss !== undefined) next.customCss = customCss;
    if (onPreviewDiff !== undefined) next.onPreviewDiff = onPreviewDiff;
    if (diffPreviewLoading !== undefined) next.diffPreviewLoading = diffPreviewLoading;
    return next;
  }, [parent, onOpenLink, onOpenPreview, renderLocalImage, customCss, onPreviewDiff, diffPreviewLoading]);
  return <MarkdownHostContext.Provider value={merged}>{children}</MarkdownHostContext.Provider>;
};

export const useMarkdownHost = (): MarkdownHostValue => useContext(MarkdownHostContext);
