/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

interface UseAutoScrollOptions {
  /** The scroll container. */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Content to watch; each change scrolls to the bottom if the user is near it. */
  content: string;
  /** Turn auto-scroll on or off. Default: true. */
  enabled?: boolean;
  /** Only follow when within this many px of the bottom, so reading older content is not interrupted. Default: 200. */
  threshold?: number;
  /** Scroll behavior. Default: 'smooth'. */
  behavior?: ScrollBehavior;
}

/**
 * 智能自动滚动 Hook
 * Smart auto-scroll Hook
 *
 * 当内容更新时，如果用户处于底部附近，则自动滚动到底部
 * When content updates, if user is near bottom, auto-scroll to bottom
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * useAutoScroll({
 *   containerRef,
 *   content: streamingText,
 *   enabled: true,
 *   threshold: 200, // 距离底部 200px 以内时跟随
 * });
 * ```
 */
export const useAutoScroll = ({
  containerRef,
  content,
  enabled = true,
  threshold = 200,
  behavior = 'smooth',
}: UseAutoScrollOptions) => {
  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    // 计算距离底部的距离 / Calculate distance from bottom
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;

    // 如果距离底部小于阈值，自动滚动到底部
    // If distance from bottom is less than threshold, auto-scroll to bottom
    if (distanceToBottom < threshold) {
      container.scrollTo({ top: scrollHeight, behavior });
    }
  }, [content, enabled, threshold, behavior, containerRef]);
};
