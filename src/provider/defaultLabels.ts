/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * English defaults for every user-facing string in the library.
 * Apps localize by passing `labels` to <UiProvider>; parameterized labels are functions
 * so the host's i18n (plurals, word order) stays in control.
 */
export const defaultLabels = {
  // Common actions
  cancel: 'Cancel',
  confirm: 'Confirm',
  clear: 'Clear',
  close: 'Close',
  back: 'Back',
  copy: 'Copy',
  copySuccess: 'Copied',
  copyFailed: 'Copy failed',
  /** Copy button on local file links (kept apart from `copy`: AionUi resolves it with an English fallback). */
  copyLink: 'Copy',
  collapse: 'Collapse',
  expand: 'Expand',
  expandMore: 'Expand More',
  viewMoreLines: (count: number): string => `View More (${count} lines)`,
  save: 'Save',
  download: 'Download',
  loading: 'Loading...',

  // Preview / diagrams
  preview: 'Preview',
  source: 'Source',
  code: 'Code',
  openInPanel: 'View in preview panel',
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  zoomReset: 'Reset view',
  diagramZoomHint: 'Scroll to zoom • Drag to pan • ESC to close',
  mermaidTitle: 'Mermaid Diagram',
  wavedromTitle: 'WaveDrom Diagram',

  // ThoughtDisplay
  processing: 'Processing...',
  retryStart: 'Retry start',
  minuteShort: 'm',
  secondShort: 's',

  // EmojiPicker
  emojiTab: 'Emoji',
  builtinTab: 'Built-in',
  noBuiltinImages: 'No built-in images',
  noRecentEmojis: 'No recent emojis',

  // Settings controls
  fontSizeDecrease: 'Decrease',
  fontSizeIncrease: 'Increase',
  scaleReset: 'Reset zoom',
  dirNotConfigured: 'Not configured yet',

  // Uploads
  uploading: (count: number): string => `Uploading ${count} file(s)...`,
  cancelUpload: 'Cancel upload',

  // ContextUsageIndicator
  cacheRead: 'Cache read',
  cacheWrite: 'Cache write',
  contextUsed: 'context used',
  inputTokens: 'Input',
  outputTokens: 'Output',
  sessionCost: 'Session cost',
  thinkingTokens: 'Thinking',
  tokensUsed: (tokens: string): string => `${tokens} tokens used`,
  windowUnknown: 'Context window size unknown',

  // TabBar / TabContextMenu / TabToolbar
  agentActiveTooltip: 'The agent is operating this tab',
  newTab: 'New tab',
  noTabs: 'No tabs open',
  collapsePanel: 'Collapse panel',
  maximizePanel: 'Maximize',
  restorePanel: 'Restore',
  unsavedChangesTitle: 'Unsaved Changes',
  closeTab: 'Close',
  closeAll: 'Close All',
  closeLeft: 'Close Left',
  closeOthers: 'Close Others',
  closeRight: 'Close Right',
  closeUnmodified: 'Close Unmodified',
  copyPath: 'Copy Path',
  copyRelativePath: 'Copy Relative Path',
  openLocation: 'Show in folder',
  openSplitScreen: 'Open split screen',
  closeSplitScreen: 'Close split screen',
  downloadFile: 'Download file',
  openInSystemApp: 'Open in system app',
  inspectElement: 'Inspect element',
  inspectElementEnable: 'Enable element inspector',
  inspectElementDisable: 'Disable element inspector',
  inspecting: 'Inspecting...',
  refresh: 'Refresh',
  refreshTooltip: 'Reload from disk',
  refreshHasUpdate: 'This file changed on disk — reload to see it',
  refreshNoSignalSource: 'This file is not in the project, so changes will not be announced',
  refreshUnavailable: 'This file cannot be located',
  saveClean: 'No unsaved changes',
  saveTooltip: 'Save changes (Ctrl/Cmd+S)',
};

export type UiLabels = typeof defaultLabels;
