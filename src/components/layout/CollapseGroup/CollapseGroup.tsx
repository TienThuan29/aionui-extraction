/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { FolderClose, FolderOpen } from '@icon-park/react';
import classNames from 'classnames';
import React from 'react';

export type CollapseGroupProps = {
  /** Whether the group is expanded (controlled). */
  expanded: boolean;
  /** Called when the header is clicked; flip `expanded` here. */
  onToggle: () => void;
  /** Header content, shown next to the folder icon. */
  header: React.ReactNode;
  /** Group content, rendered only while expanded. */
  children: React.ReactNode;
  /** Extra class name on the root element. */
  className?: string;
  /** Collapsed-sidebar mode: hides the header and removes the content indent. */
  siderCollapsed?: boolean;
  /** Slot at the end of the header (e.g. a hover menu button). Clicks here do not toggle the group. */
  trailing?: React.ReactNode;
  /** Keep the header pinned to the top of the scroll container while its content scrolls past. */
  stickyHeader?: boolean;
  /** Offset (px) from the top of the scroll container while sticky, e.g. to clear a pinned title above. */
  stickyTop?: number;
};

/**
 * 工作空间折叠组件 - 简单的折叠面板，用于工作空间分组
 */
const CollapseGroup: React.FC<CollapseGroupProps> = ({
  expanded,
  onToggle,
  header,
  children,
  className,
  siderCollapsed = false,
  trailing,
  stickyHeader = false,
  stickyTop,
}) => {
  // 侧栏折叠时，强制展开内容并隐藏头部
  const showContent = siderCollapsed || expanded;
  // 仅在展开状态吸顶：折叠的项目头部无需常驻，避免多个折叠头堆叠在顶部
  const stickyEnabled = stickyHeader && expanded && !siderCollapsed;

  return (
    <div className={classNames('workspace-collapse min-w-0', className)}>
      {/* 折叠头部 - 侧栏折叠时隐藏。吸顶时外层用不透明 bg-2 作遮罩，
          内层的半透明 hover 高亮叠在遮罩上而非透出下方滚动内容。 */}
      {!siderCollapsed && (
        <div
          className={classNames(stickyEnabled && 'sticky z-[9] bg-[var(--bg-2)]')}
          style={stickyEnabled ? { top: stickyTop ?? 0 } : undefined}
        >
          <div
            className='flex items-center gap-8px h-34px ps-10px pe-8px cursor-pointer hover:bg-fill-3 rd-8px transition-colors min-w-0 group'
            onClick={onToggle}
          >
            <span className='size-22px flex items-center justify-center shrink-0 text-t-primary'>
              {expanded ? (
                <FolderOpen theme='outline' size={16} fill='currentColor' className='line-height-0' />
              ) : (
                <FolderClose theme='outline' size={16} fill='currentColor' className='line-height-0' />
              )}
            </span>

            {/* 标题内容 — flex 容器让内部 header span 的 truncate 生效 */}
            <div className='flex-1 min-w-0 flex items-center overflow-hidden'>{header}</div>

            {/* 尾部操作槽 — 固定宽度让文本提前截断；按钮 hover 才出现时允许左溢出到文本区覆盖最后 1-2 字 */}
            {trailing && (
              <div className='shrink-0 flex items-center justify-end w-22px' onClick={(e) => e.stopPropagation()}>
                {trailing}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 折叠内容 — row 保持全宽以便选中态 bg 填满整行；视觉缩进由 ConversationRow 的 dimIcon 分支自行处理 */}
      {showContent && <div className='workspace-collapse-content min-w-0'>{children}</div>}
    </div>
  );
};

export default CollapseGroup;
