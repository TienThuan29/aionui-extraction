/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import classNames from 'classnames';
import { removeStack } from '../utils/removeStack';

const addWindowEventListener = <K extends keyof WindowEventMap>(
  key: K,
  handler: (e: WindowEventMap[K]) => void
): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }
  window.addEventListener(key, handler);
  return () => {
    window.removeEventListener(key, handler);
  };
};

interface UseResizableSplitOptions {
  /** Default width: a percentage (0-100) with `unit: 'ratio'`, pixels with `unit: 'px'`. Default: 50. */
  defaultWidth?: number;
  /** Minimum width, in the same unit. Default: 20. */
  minWidth?: number;
  /** Maximum width, in the same unit. Default: 80. */
  maxWidth?: number;
  /** localStorage key that remembers the user's width. */
  storageKey?: string;
  /** Percentage of the container or pixels. Default: 'ratio'. */
  unit?: 'ratio' | 'px';
  /**
   * Collapse snap threshold (px mode only; omit to disable collapsing and just clamp).
   * Dragging below it previews the collapsed state (the panel snaps to `collapsedWidth`);
   * releasing there collapses without saving, so the last valid width is kept.
   */
  collapseThreshold?: number;
  /** Width while collapsed (with `collapseThreshold`), usually 0. */
  collapsedWidth?: number;
  /** Collapsed state owned by the caller; a drag from collapsed starts at `collapsedWidth`. */
  collapsed?: boolean;
  /** Called when a drag crosses the threshold or ends, with the new collapsed state. */
  onCollapsedChange?: (collapsed: boolean) => void;
}

/**
 * Resizable split panel hook with user preference persistence.
 *
 * @param options - Configuration options
 * @returns `splitRatio`, a ready `dragHandle`, `setSplitRatio`, and `createDragHandle(options)` for custom handles
 */
export const useResizableSplit = (options: UseResizableSplitOptions = {}) => {
  const { defaultWidth = 50, minWidth = 20, maxWidth = 80, storageKey, unit = 'ratio' } = options;
  const { collapseThreshold, collapsedWidth = 0, collapsed = false, onCollapsedChange } = options;
  const isPx = unit === 'px';
  // Collapse 语义仅在 px 模式且显式给出阈值时启用；否则完全退化为原 clamp 行为。
  const collapseEnabled = isPx && typeof collapseThreshold === 'number';

  // 从 LocalStorage 读取保存的比例 / Read saved ratio from LocalStorage
  const getStoredRatio = (): number => {
    if (!storageKey) return defaultWidth;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const ratio = parseFloat(stored);
        if (!isNaN(ratio) && ratio >= minWidth && ratio <= maxWidth) {
          return ratio;
        }
      }
    } catch (error) {
      console.error('Failed to read split ratio from localStorage:', error);
    }
    return defaultWidth;
  };

  const [splitRatio, setSplitRatioState] = useState(() => getStoredRatio());

  const dispatchSplitResizeEvent = useCallback((ratio: number) => {
    if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') {
      return;
    }
    window.dispatchEvent(new CustomEvent('preview-panel-resize', { detail: { ratio } }));
  }, []);

  // 保存比例到 LocalStorage / Save ratio to LocalStorage
  const setSplitRatio = useCallback(
    (ratio: number) => {
      setSplitRatioState(ratio);
      dispatchSplitResizeEvent(ratio);
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, ratio.toString());
        } catch (error) {
          console.error('Failed to save split ratio to localStorage:', error);
        }
      }
    },
    [storageKey, dispatchSplitResizeEvent]
  );

  // 处理拖动开始事件 / Handle drag start event
  const handleDragStart = useCallback(
    (reverse = false) =>
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== 'touch' && event.button !== 0) {
          return;
        }
        event.preventDefault();

        const dragHandle = event.currentTarget as HTMLElement;
        const parent = dragHandle.parentElement;
        const outerContainer = parent?.parentElement;
        const containerWidth = outerContainer?.offsetWidth || 0;
        if (!isPx && !containerWidth) {
          return;
        }

        const startX = event.clientX;
        // 收起态从收起宽度起拖（复刻旧 beginSiderResizeDrag 的 startWidth 语义），
        // 否则从当前面板宽度起拖。
        const startRatio = collapseEnabled && collapsed ? collapsedWidth : splitRatio;
        const pointerId = event.pointerId;
        // px 模式下拖动直接换算为像素差，不再除以容器宽度。
        // 原始追踪值：上侧始终 clamp 到 maxWidth；下侧在启用 collapse 时可下探到
        // collapsedWidth（用于探测收起意图），否则沿用旧行为 clamp 到 minWidth。
        const computeRaw = (clientX: number): number => {
          const deltaX = reverse ? startX - clientX : clientX - startX;
          const base = isPx ? startRatio + deltaX : startRatio + (deltaX / containerWidth) * 100;
          const floor = collapseEnabled ? collapsedWidth : minWidth;
          return Math.max(floor, Math.min(maxWidth, base));
        };
        let rafId: number | null = null;
        let pendingRatio: number | null = null;
        // latestRatio 只跟踪「最后一次合法展开宽度」，收起预览不更新它 → 无 clientX
        // 的兜底提交（blur）恢复到最后合法值而非预览值。
        let latestRatio = collapseEnabled && collapsed ? splitRatio : startRatio;
        let collapsedNow = collapseEnabled ? collapsed : false;
        let isDragging = true;
        let cleanupListeners: (() => void) | null = null;

        // 把一个原始追踪值应用为实时视图（拖拽中）。
        const applyLiveRatio = (raw: number) => {
          if (collapseEnabled && raw < (collapseThreshold as number)) {
            // 收起预览：不写 state（保留最后合法宽度），仅切收起态。
            if (!collapsedNow) {
              collapsedNow = true;
              onCollapsedChange?.(true);
            }
            return;
          }
          const legal = collapseEnabled ? Math.max(minWidth, raw) : raw;
          latestRatio = legal;
          setSplitRatioState(legal);
          dispatchSplitResizeEvent(legal);
          if (collapseEnabled && collapsedNow) {
            collapsedNow = false;
            onCollapsedChange?.(false);
          }
        };

        const flushPendingRatio = () => {
          if (pendingRatio === null) {
            return;
          }
          applyLiveRatio(pendingRatio);
        };

        // 初始化拖动样式 / Initialize drag styles
        const initDragStyle = () => {
          const originalUserSelect = document.body.style.userSelect;
          document.body.style.userSelect = 'none';
          document.body.style.cursor = 'col-resize';

          const layoutSider = dragHandle.closest('.layout-sider');
          if (layoutSider) {
            layoutSider.classList.add('layout-sider--dragging');
          }

          return () => {
            document.body.style.userSelect = originalUserSelect;
            document.body.style.cursor = '';
            if (rafId !== null) {
              cancelAnimationFrame(rafId);
              rafId = null;
            }
            if (layoutSider) {
              layoutSider.classList.remove('layout-sider--dragging');
            }
          };
        };

        const finishDrag = (e?: PointerEvent | MouseEvent | FocusEvent) => {
          if (!isDragging) {
            return;
          }
          isDragging = false;

          if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          flushPendingRatio();

          // 松手终值：优先用真实指针位置重算；缺 clientX（blur）则用跟踪态兜底。
          const raw = e && 'clientX' in e && typeof e.clientX === 'number' ? computeRaw(e.clientX) : null;
          const committedCollapsed =
            raw !== null ? collapseEnabled && raw < (collapseThreshold as number) : collapsedNow;

          if (committedCollapsed) {
            // 提交收起：不调 setSplitRatio → localStorage 保留最后合法宽度。
            onCollapsedChange?.(true);
          } else {
            const legal = raw !== null ? (collapseEnabled ? Math.max(minWidth, raw) : raw) : latestRatio;
            setSplitRatio(legal);
            if (collapseEnabled) onCollapsedChange?.(false);
          }
          cleanupListeners?.();
        };

        const handlePointerMove = (e: PointerEvent) => {
          if (!isDragging) {
            return;
          }
          if (e.buttons === 0) {
            finishDrag(e);
            return;
          }
          pendingRatio = computeRaw(e.clientX);
          if (rafId === null) {
            rafId = requestAnimationFrame(() => {
              rafId = null;
              flushPendingRatio();
            });
          }
        };

        const handleLostPointerCapture = () => finishDrag();

        const handlePointerUp = (e: PointerEvent) => finishDrag(e);
        const handlePointerCancel = (e: PointerEvent) => finishDrag(e);
        const handleMouseUp = (e: MouseEvent) => finishDrag(e);

        if (dragHandle.setPointerCapture) {
          try {
            dragHandle.setPointerCapture(pointerId);
            dragHandle.addEventListener('lostpointercapture', handleLostPointerCapture);
          } catch (error) {
            // 忽略 pointer capture 失败，继续使用备用逻辑 / Ignore failures silently
          }
        }

        const releasePointerCapture = () => {
          if (dragHandle.releasePointerCapture && dragHandle.hasPointerCapture?.(pointerId)) {
            dragHandle.releasePointerCapture(pointerId);
          }
          dragHandle.removeEventListener('lostpointercapture', handleLostPointerCapture);
        };

        cleanupListeners = removeStack(
          initDragStyle(),
          releasePointerCapture,
          addWindowEventListener('pointermove', handlePointerMove),
          addWindowEventListener('pointerup', handlePointerUp),
          addWindowEventListener('pointercancel', handlePointerCancel),
          addWindowEventListener('mouseup', handleMouseUp),
          addWindowEventListener('blur', () => finishDrag())
        );
      },
    [
      splitRatio,
      minWidth,
      maxWidth,
      setSplitRatio,
      dispatchSplitResizeEvent,
      isPx,
      collapseEnabled,
      collapseThreshold,
      collapsedWidth,
      collapsed,
      onCollapsedChange,
    ]
  );

  const renderHandle = ({
    className,
    style,
    reverse,
    linePlacement,
    lineClassName,
    lineStyle,
  }: {
    className?: string;
    style?: CSSProperties;
    reverse?: boolean;
    linePlacement?: 'start' | 'end';
    lineClassName?: string;
    lineStyle?: CSSProperties;
  } = {}) => (
    <div
      className={classNames(
        'group absolute top-0 bottom-0 z-20 cursor-col-resize flex items-center',
        linePlacement
          ? linePlacement === 'start'
            ? 'justify-start'
            : 'justify-end'
          : reverse
            ? 'justify-start'
            : 'justify-end',
        className
      )}
      style={{ width: '12px', ...style }}
      onPointerDown={handleDragStart(reverse)}
      onDoubleClick={() => {
        setSplitRatio(defaultWidth);
        onCollapsedChange?.(false);
      }}
    >
      <span
        className={classNames(
          'pointer-events-none block h-full w-2px bg-bg-3 opacity-90 rd-full transition-all duration-150 group-hover:w-6px group-hover:bg-aou-6 group-active:w-6px group-active:bg-aou-6',
          lineClassName
        )}
        style={lineStyle}
      />
    </div>
  );

  return {
    splitRatio,
    dragHandle: renderHandle({ className: 'end-0' }),
    setSplitRatio,
    createDragHandle: renderHandle,
  };
};
