/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { iconColors } from '../../../tokens/colors';
import { Close } from '@icon-park/react';
import React from 'react';
import { useUi } from '../../../provider';

// For files already on disk, downloading a copy is redundant; synthetic content still offers download.
const shouldShowDownload = (contentType: string, hasFilePath: boolean): boolean =>
  !((contentType === 'code' || contentType === 'markdown') && hasFilePath);

/**
 * TabToolbar component props
 */
export type TabToolbarProps = {
  /**
   * Content type
   */
  content_type: string;

  /**
   * Whether it's a Markdown file
   */
  isMarkdown: boolean;

  /**
   * Whether it's an HTML file
   */
  isHTML: boolean;

  /**
   * Current view mode
   */
  viewMode: 'source' | 'preview';

  /**
   * Whether split-screen mode is enabled
   */
  isSplitScreenEnabled: boolean;

  /**
   * Filename
   */
  file_name?: string;

  /**
   * Whether to show "Open in System" button
   */
  showOpenInSystemButton: boolean;

  /**
   * The tab has no content to act on — either it exceeded the size ceiling or its
   * format cannot be rendered. View-mode switching, split screen and inspect all
   * operate on content, so they are hidden; "open in system" and "download" stay,
   * because they are the only way the user reaches the file.
   */
  hasNoRenderableContent?: boolean;

  /**
   * Whether the file exists on disk (has a file_path). Passed separately from
   * showOpenInSystemButton on purpose: that flag now also accepts a bare fileRef
   * (the escape hatch), so it no longer means "on disk". Reusing it here would
   * silently drop the download button from explorer-opened code/markdown tabs.
   */
  hasFilePath: boolean;

  /**
   * Refresh control state token; not rendered when `'hidden'` or absent. `'updated'` highlights it,
   * `'idle-no-signal'` and `'disabled'` change its tooltip; any other value is the plain refresh.
   */
  refreshState?: string;

  /** Whether the refresh control accepts a click */
  refreshActionable?: boolean;

  /** Reload the current tab */
  onRefresh?: () => void;

  /**
   * Whether to show the save button (only editable types with renderable content).
   */
  showSave?: boolean;

  /** Whether the save control accepts a click (has unsaved edits) */
  saveActionable?: boolean;

  /** Save the current tab */
  onSave?: () => void;

  /**
   * Set view mode
   */
  onViewModeChange: (mode: 'source' | 'preview') => void;

  /**
   * Set split-screen mode
   */
  onSplitScreenToggle: () => void;

  /**
   * Open file in system
   */
  onOpenInSystem: () => void;

  /**
   * Download file
   */
  onDownload: () => void;

  /**
   * Close preview panel
   */
  onClose: () => void;

  /**
   * HTML inspect mode (only for HTML type)
   */
  inspectMode?: boolean;

  /**
   * Toggle HTML inspect mode (only for HTML type)
   */
  onInspectModeToggle?: () => void;

  /**
   * Extra content rendered on the left section
   */
  leftExtra?: React.ReactNode;

  /**
   * Extra content rendered on the right section
   */
  rightExtra?: React.ReactNode;
};

/**
 * Preview panel toolbar component
 *
 * Contains filename, view mode toggle, download button, close button, etc.
 */
// eslint-disable-next-line max-len
const TabToolbar: React.FC<TabToolbarProps> = ({
  content_type,
  isMarkdown,
  isHTML,
  viewMode,
  isSplitScreenEnabled,
  file_name,
  showOpenInSystemButton,
  hasNoRenderableContent = false,
  hasFilePath,
  refreshState,
  refreshActionable = false,
  onRefresh,
  showSave = false,
  saveActionable = false,
  onSave,
  onViewModeChange,
  onSplitScreenToggle,
  onOpenInSystem,
  onDownload,
  onClose,
  inspectMode,
  onInspectModeToggle,
  leftExtra,
  rightExtra,
}) => {
  const { labels } = useUi();
  const isDiff = content_type === 'diff';
  const preferActionButtonsInFront = Boolean(leftExtra);
  // 下载的隐藏规则看的是「文件是否在磁盘上」，用 hasFilePath 而不是
  // showOpenInSystemButton（后者已包含纯 fileRef 的情况）。
  // The download rule keys off "is the file on disk", so use hasFilePath rather
  // than showOpenInSystemButton (which now also covers bare-fileRef tabs).
  const showDownload = shouldShowDownload(content_type, hasFilePath);

  const toolbarBtn =
    'flex items-center gap-2px px-8px py-3px rd-4px cursor-pointer transition-colors duration-150 text-12px font-medium text-t-secondary hover:text-t-primary hover:bg-bg-3';
  const toolbarBtnActive = '!text-white bg-brand hover:!text-white hover:bg-brand-hover';
  const toolbarIconSize = 12;

  return (
    <div className='flex items-center justify-between h-32px px-10px bg-bg-2 flex-shrink-0 border-b border-border-1 overflow-x-auto'>
      <div className='flex items-center justify-between gap-8px w-full' style={{ minWidth: 'max-content' }}>
        {/* 左侧：Tabs（Markdown/HTML）+ 文件名 / Left: Tabs (Markdown/HTML) + Filename */}
        <div className='flex items-center h-full gap-8px'>
          {(isMarkdown || isHTML || isDiff) && !hasNoRenderableContent && (
            <>
              <div className='flex items-center h-full gap-0'>
                <div
                  className={`flex items-center h-full px-10px cursor-pointer transition-all duration-150 text-12px font-medium ${viewMode === 'source' ? 'text-brand bg-aou-2 border-b-4 border-brand' : 'text-t-secondary hover:text-t-primary hover:bg-bg-3'}`}
                  onClick={() => {
                    try {
                      onViewModeChange('source');
                    } catch {
                      /* ignore */
                    }
                  }}
                >
                  {isHTML ? labels.code : labels.source}
                </div>
                <div
                  className={`flex items-center h-full px-10px cursor-pointer transition-all duration-150 text-12px font-medium ${viewMode === 'preview' ? 'text-brand bg-aou-2 border-b-4 border-brand' : 'text-t-secondary hover:text-t-primary hover:bg-bg-3'}`}
                  onClick={() => {
                    try {
                      onViewModeChange('preview');
                    } catch {
                      /* ignore */
                    }
                  }}
                >
                  {labels.preview}
                </div>
              </div>
              {!isDiff && (
                <div
                  className={`flex items-center px-8px py-3px rd-4px cursor-pointer transition-colors duration-150 ${isSplitScreenEnabled ? toolbarBtnActive : 'text-t-secondary hover:bg-bg-3'}`}
                  onClick={() => {
                    try {
                      onSplitScreenToggle();
                    } catch {
                      /* ignore */
                    }
                  }}
                  title={isSplitScreenEnabled ? labels.closeSplitScreen : labels.openSplitScreen}
                >
                  <svg
                    width={toolbarIconSize}
                    height={toolbarIconSize}
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <rect x='3' y='3' width='18' height='18' rx='2' />
                    <line x1='12' y1='3' x2='12' y2='21' />
                  </svg>
                </div>
              )}
            </>
          )}

          {preferActionButtonsInFront && showOpenInSystemButton && (
            <div className={toolbarBtn} onClick={onOpenInSystem} title={labels.openInSystemApp}>
              <svg
                width={toolbarIconSize}
                height={toolbarIconSize}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className='text-t-secondary'
              >
                <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                <polyline points='15 3 21 3 21 9' />
                <line x1='10' y1='14' x2='21' y2='3' />
              </svg>
              <span>{labels.openInSystemApp}</span>
            </div>
          )}
          {preferActionButtonsInFront && showDownload && (
            <div className={toolbarBtn} onClick={() => void onDownload()} title={labels.downloadFile}>
              <svg
                width={toolbarIconSize}
                height={toolbarIconSize}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className='text-t-secondary'
              >
                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                <polyline points='7 10 12 15 17 10' />
                <line x1='12' y1='15' x2='12' y2='3' />
              </svg>
              <span>{labels.download}</span>
            </div>
          )}
          {leftExtra}
        </div>

        <div className='flex items-center gap-4px flex-shrink-0'>
          {/* 刷新：放在这个稳定容器里，不进下面那两个「前置/后置」重复块 ——
              那两块由 preferActionButtonsInFront 二选一，只有 PDF 注入 leftExtra，
              所以按钮会随 tab 类型左右跳。
              Refresh lives in this stable container rather than in the duplicated
              front/back action blocks below: those two are selected by
              preferActionButtonsInFront, and only PDF injects leftExtra, so anything
              placed in them jumps sides when the tab type changes. */}
          {refreshState !== undefined && refreshState !== 'hidden' && (
            <div
              data-testid='preview-refresh'
              data-refresh-state={refreshState}
              className={`${toolbarBtn} ${refreshState === 'updated' ? '!text-warning-6' : ''} ${
                refreshActionable ? '' : '!cursor-not-allowed opacity-50'
              }`}
              onClick={refreshActionable ? onRefresh : undefined}
              title={
                refreshState === 'updated'
                  ? labels.refreshHasUpdate
                  : refreshState === 'idle-no-signal'
                    ? labels.refreshNoSignalSource
                    : refreshState === 'disabled'
                      ? labels.refreshUnavailable
                      : labels.refreshTooltip
              }
            >
              <svg
                width={toolbarIconSize}
                height={toolbarIconSize}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M21 12a9 9 0 1 1-3-6.7' />
                <polyline points='21 3 21 9 15 9' />
              </svg>
              <span>{labels.refresh}</span>
            </div>
          )}

          {rightExtra}

          {!preferActionButtonsInFront && showOpenInSystemButton && (
            <div className={toolbarBtn} onClick={onOpenInSystem} title={labels.openInSystemApp}>
              <svg
                width={toolbarIconSize}
                height={toolbarIconSize}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className='text-t-secondary'
              >
                <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                <polyline points='15 3 21 3 21 9' />
                <line x1='10' y1='14' x2='21' y2='3' />
              </svg>
              <span>{labels.openInSystemApp}</span>
            </div>
          )}

          {!preferActionButtonsInFront && showDownload && (
            <div className={toolbarBtn} onClick={() => void onDownload()} title={labels.downloadFile}>
              <svg
                width={toolbarIconSize}
                height={toolbarIconSize}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className='text-t-secondary'
              >
                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                <polyline points='7 10 12 15 17 10' />
                <line x1='12' y1='15' x2='12' y2='3' />
              </svg>
              <span>{labels.download}</span>
            </div>
          )}

          {isHTML && !hasNoRenderableContent && onInspectModeToggle && (
            <div
              className={`${toolbarBtn} ${inspectMode ? toolbarBtnActive : ''}`}
              onClick={onInspectModeToggle}
              title={inspectMode ? labels.inspectElementDisable : labels.inspectElementEnable}
            >
              <svg
                width={toolbarIconSize}
                height={toolbarIconSize}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={inspectMode ? 'text-white' : 'text-t-secondary'}
              >
                <path d='M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z' />
                <path d='M13 13l6 6' />
              </svg>
              <span>{inspectMode ? labels.inspecting : labels.inspectElement}</span>
            </div>
          )}

          {/* 保存：可编辑类型才出现，放在这一栏最后、最靠右；无未保存修改时置灰不可点。
              Save: appears only for editable types, placed last (rightmost) in this row;
              greyed out and non-clickable when there is nothing unsaved. */}
          {showSave && (
            <div
              data-testid='preview-save'
              className={`${toolbarBtn} ${saveActionable ? '!text-warning-6' : '!cursor-not-allowed opacity-50'}`}
              onClick={saveActionable ? onSave : undefined}
              title={saveActionable ? labels.saveTooltip : labels.saveClean}
            >
              <svg
                width={toolbarIconSize}
                height={toolbarIconSize}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' />
                <polyline points='17 21 17 13 7 13 7 21' />
                <polyline points='7 3 7 8 15 8' />
              </svg>
              <span>{labels.save}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabToolbar;
