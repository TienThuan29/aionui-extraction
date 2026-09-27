/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { Select } from '@arco-design/web-react';
import type { SelectProps } from '@arco-design/web-react';
import type { SelectHandle } from '@arco-design/web-react/es/Select/interface';
import classNames from 'classnames';
import React from 'react';

/**
 * AionSelect props: every Arco Select prop, plus the extra `middle` size.
 */
type NativeSelectProps = Omit<SelectProps, 'size'>;
type NativeSelectSize = NonNullable<SelectProps['size']>;
type AionSelectSize = NativeSelectSize | 'middle';

export interface AionSelectProps extends NativeSelectProps {
  /** Extra class name on the root element. */
  className?: string;
  /**
   * Arco sizes plus `middle` (32px, the AionUi default).
   * @default 'middle'
   */
  size?: AionSelectSize;
}

/**
 * Note: Theme-related styles (background, border colors) are defined in .aion-select class in arco-override.css
 */
const BASE_CLASS = classNames(
  'aion-select',
  '[&_.arco-select-view]:rounded-[4px]',
  '[&_.arco-select-view]:border',
  '[&_.arco-select-view]:border-solid',
  '[&_.arco-select-view]:border-border-2',
  '[&_.arco-select-view]:shadow-none',
  '[&_.arco-select-view]:transition-colors',
  '[&_.arco-select-view:hover]:border-[var(--color-primary)]',
  '[&_.arco-select-view:focus-within]:border-[var(--color-primary)]',
  '[&_.arco-select-view-disabled]:bg-[var(--color-bg-2)]',
  '[&_.arco-select-view-disabled]:opacity-80'
);

/**
 * Default popup container getter function
 * Always returns document.body to avoid ResizeObserver loop errors from nested containers
 */
const defaultGetPopupContainer = (): HTMLElement => {
  // 在浏览器环境下始终挂载到 body，避免嵌套容器导致 ResizeObserver 循环
  // Always mount popup to body in browsers to avoid nested-container ResizeObserver loops
  if (typeof document !== 'undefined' && document.body) {
    return document.body;
  }
  // SSR/测试环境降级返回占位，具体不会真正渲染
  // Fallback for SSR/tests – this code path shouldn't render popups
  return undefined as unknown as HTMLElement;
};

/**
 * Arco Select with the AionUi border, radius and theme styles. The popup mounts on document.body
 * to avoid ResizeObserver loops in nested containers. Supports the full Arco Select API,
 * including AionSelect.Option and AionSelect.OptGroup.
 *
 * @see arco-override.css for theme-related styles (.aion-select)
 */
const mapSizeToNative = (size?: AionSelectSize): NativeSelectSize | undefined => {
  if (!size) return undefined;
  if (size === 'middle') return 'default';
  return size;
};

type AionSelectComponent = React.ForwardRefExoticComponent<AionSelectProps & React.RefAttributes<SelectHandle>> & {
  Option: typeof Select.Option;
  OptGroup: typeof Select.OptGroup;
};

const InternalSelect = React.forwardRef<SelectHandle, AionSelectProps>(
  ({ className, getPopupContainer, size = 'middle', ...rest }, ref) => {
    const normalizedSize = mapSizeToNative(size);
    return (
      <Select
        ref={ref}
        size={normalizedSize}
        className={classNames(BASE_CLASS, className)}
        getPopupContainer={getPopupContainer || defaultGetPopupContainer}
        {...rest}
      />
    );
  }
);

const AionSelect = InternalSelect as AionSelectComponent;

AionSelect.displayName = 'AionSelect';

// 导出子组件 / Export sub-components
AionSelect.Option = Select.Option;
AionSelect.OptGroup = Select.OptGroup;

export default AionSelect;
