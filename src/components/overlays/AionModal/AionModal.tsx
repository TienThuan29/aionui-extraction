/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ModalProps } from '@arco-design/web-react';
import { Modal, Button } from '@arco-design/web-react';
import { Close } from '@icon-park/react';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import { useUi } from '../../../provider';
import React from 'react';

// ==================== Types ====================

/** Preset sizes. */
export type ModalSize = 'small' | 'medium' | 'large' | 'xlarge' | 'full';

/** Width/height of each preset size. */
export const MODAL_SIZES: Record<ModalSize, { width: string; height?: string }> = {
  small: { width: '400px', height: '300px' },
  medium: { width: '600px', height: '400px' },
  large: { width: '800px', height: '600px' },
  xlarge: { width: '1000px', height: '700px' },
  full: { width: '90vw', height: '90vh' },
};

/** Header configuration. */
export interface ModalHeaderConfig {
  /** Render the whole header yourself. */
  render?: () => React.ReactNode;
  /** Title text or node. */
  title?: React.ReactNode;
  /** Optional subtitle; when omitted the row is not rendered at all. */
  subtitle?: React.ReactNode;
  /** Show the close button. */
  showClose?: boolean;
  /** Custom close icon. */
  closeIcon?: React.ReactNode;
  /** Extra class name on the header. */
  className?: string;
  /** Extra style on the header. */
  style?: CSSProperties;
}

/** Footer configuration. */
export interface ModalFooterConfig {
  /** Render the whole footer yourself. */
  render?: () => React.ReactNode;
  /** Extra class name on the footer. */
  className?: string;
  /** Extra style on the footer. */
  style?: CSSProperties;
  /**
   * Draw the standard top divider and padding around the footer.
   * @default false
   */
  divider?: boolean;
}

/** Style of the modal content area. */
export interface ModalContentStyleConfig {
  /** Background; defaults to `var(--dialog-fill-0)`. */
  background?: string;
  /** Corner radius; defaults to 16px. */
  borderRadius?: string | number;
  /** Padding; defaults to 0. */
  padding?: string | number;
  /** Overflow of the content area; defaults to `auto`. */
  overflow?: 'auto' | 'scroll' | 'hidden' | 'visible';
  /** Content height (number = px). */
  height?: string | number;
  /** Content minimum height. */
  minHeight?: string | number;
  /** Content maximum height. */
  maxHeight?: string | number;
}

/** AionModal props. */
export interface AionModalProps extends Omit<ModalProps, 'title' | 'footer'> {
  /** Modal body. */
  children?: React.ReactNode;

  /**
   * `'standard'` enables the task-dialog layout: a padded header with a divider, a padded
   * scrolling body, and a footer with a divider. Omit it for the plain layout.
   */
  variant?: 'standard';

  /** Preset size; `style.width`/`style.height` override it. */
  size?: ModalSize;

  /** A title (string or node, with a close button) or a full header configuration. */
  header?: React.ReactNode | ModalHeaderConfig;

  /**
   * Footer node or configuration. Omitted: Cancel and OK buttons wired to `onCancel`/`onOk`.
   * `null`: no footer.
   */
  footer?: React.ReactNode | ModalFooterConfig | null;

  /** Style of the content area. */
  contentStyle?: ModalContentStyleConfig;

  // === Backward-compatible props ===
  /** @deprecated Use `header.title`. */
  title?: React.ReactNode;
  /** @deprecated Use `header.showClose`. */
  showCustomClose?: boolean;
}

// ==================== 样式常量 / Style Constants ====================

const HEADER_BASE_CLASS = 'flex items-center justify-between pb-20px';
const TITLE_BASE_CLASS = 'text-18px font-500 text-t-primary m-0';
const CLOSE_BUTTON_CLASS =
  'w-32px h-32px flex items-center justify-center rd-8px transition-colors duration-200 cursor-pointer border-0 bg-transparent p-0 hover:bg-2 focus:outline-none';
const FOOTER_BASE_CLASS = 'flex-shrink-0 bg-transparent';
/** Footer divider and padding for task dialogs. */
const FOOTER_DIVIDER_CLASS = 'flex-shrink-0 border-t border-solid border-[var(--bg-3)] px-24px py-16px';

// ===== standard 变体：统一三段式布局 =====
/** Header: 20/24/16 padding with a full-width bottom divider. */
const STD_HEADER_CLASS = 'aionui-modal-std-header flex items-start justify-between gap-16px px-24px pt-20px pb-16px';
const STD_TITLE_CLASS = 'text-18px font-600 leading-26px text-t-primary m-0';
const STD_SUBTITLE_CLASS = 'text-13px leading-20px text-t-secondary m-0 mt-4px';
/** Body layout: fills the remaining height and scrolls (padding separate). */
const STD_BODY_LAYOUT_CLASS = 'aionui-modal-std-body min-h-0 flex-1 overflow-y-auto';
/** Standard body padding (20/24); `contentStyle.padding` replaces it. */
const STD_BODY_PADDING_CLASS = 'px-24px py-20px';
const STD_CLOSE_BTN_CLASS =
  'shrink-0 w-32px h-32px flex items-center justify-center rd-8px transition-colors duration-200 cursor-pointer border-0 bg-transparent p-0 text-t-secondary hover:bg-fill-2 focus:outline-none';

/**
 * Arco Modal with the AionUi look: preset sizes, header/footer configuration, a standard
 * task-dialog layout, sizes that follow the UiProvider font scale, and a viewport-fitting
 * maximum size.
 */
const dimensionKeys = ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight'] as const;
type DimensionKey = (typeof dimensionKeys)[number];

const formatDimensionValue = (value?: string | number) => {
  if (value === undefined || value === null) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
};

const AionModal: React.FC<AionModalProps> = ({
  children,
  variant,
  size,
  header,
  footer,
  contentStyle,
  // 向后兼容
  title,
  showCustomClose = true,
  onCancel,
  className = '',
  style,
  ...props
}) => {
  const isStandard = variant === 'standard';
  const { fontScale } = useUi();
  const { labels } = useUi();
  // standard 变体默认给内容区标准内边距（上下20/左右24）；当调用方显式传入
  // contentStyle.padding（如团队创建的通栏双栏传 0）时，交由调用方自行处理内边距。
  const stdBodyHasCustomPadding = isStandard && contentStyle?.padding !== undefined;
  // 处理 contentStyle 配置，转换为 CSS 变量
  const contentBg = contentStyle?.background || 'var(--dialog-fill-0)';
  const contentBorderRadius = contentStyle?.borderRadius || '16px';
  const contentPadding = contentStyle?.padding || '0';
  const contentOverflow = contentStyle?.overflow || 'auto';

  const borderRadiusVal = typeof contentBorderRadius === 'number' ? `${contentBorderRadius}px` : contentBorderRadius;
  const paddingVal = typeof contentPadding === 'number' ? `${contentPadding}px` : contentPadding;

  const safeScale = fontScale > 0 ? fontScale : 1;

  const scaleDimension = (value: CSSProperties['width']): CSSProperties['width'] => {
    if (value === undefined || value === null) return value;
    if (typeof value === 'number') {
      return Number((value / safeScale).toFixed(2));
    }
    const match = /^([0-9]+(?:\.[0-9]+)?)px$/i.exec(value.trim());
    if (match) {
      return `${parseFloat(match[1]) / safeScale}px`;
    }
    return value;
  };

  // 处理尺寸缩放 / Handle size scaling
  const modalSize = size ? MODAL_SIZES[size] : undefined;
  const baseStyle: CSSProperties = {
    ...modalSize,
    ...style,
  };

  // 缩放尺寸相关属性（避免副作用）/ Scale size-related properties (avoid side effects)
  type DimensionStyle = Partial<Pick<CSSProperties, DimensionKey>>;
  const scaledStyle: DimensionStyle = {};
  dimensionKeys.forEach((key) => {
    const raw = baseStyle[key];
    if (raw !== undefined) {
      scaledStyle[key] = scaleDimension(raw as CSSProperties['width']) as CSSProperties[DimensionKey];
    }
  });

  const mergedStyle: CSSProperties = {
    ...baseStyle,
    ...scaledStyle,
  };

  // 自动设置最大宽高以适应视口 / Auto set max dimensions to fit viewport
  if (typeof window !== 'undefined') {
    const viewportGap = 32;
    if (!mergedStyle.maxWidth) {
      mergedStyle.maxWidth = `calc(100vw - ${viewportGap}px)`;
    }
    if (!mergedStyle.maxHeight) {
      mergedStyle.maxHeight = `calc(100vh - ${viewportGap}px)`;
    }
  }

  const finalStyle: CSSProperties = {
    ...mergedStyle,
    borderRadius: mergedStyle.borderRadius ?? '16px',
  };

  const bodyInlineStyle = React.useMemo<CSSProperties>(() => {
    const style: CSSProperties = {
      background: contentBg,
      overflow: contentOverflow,
    };

    (['height', 'minHeight', 'maxHeight'] as const).forEach((key) => {
      const value = contentStyle?.[key];
      if (value !== undefined) {
        style[key] = formatDimensionValue(value);
      }
    });

    return style;
  }, [contentBg, paddingVal, contentOverflow, contentStyle?.height, contentStyle?.maxHeight, contentStyle?.minHeight]);

  // 处理 Header 配置（向后兼容）
  const headerConfig: ModalHeaderConfig = React.useMemo(() => {
    // 如果使用新的 header 配置
    if (header !== undefined) {
      // 如果是字符串或 ReactNode，转换为 title 配置
      if (typeof header === 'string' || React.isValidElement(header)) {
        return {
          title: header,
          showClose: true,
        };
      }
      // 如果是配置对象
      return header as ModalHeaderConfig;
    }
    // 向后兼容旧的 title 和 showCustomClose
    return {
      title,
      showClose: showCustomClose,
    };
  }, [header, title, showCustomClose]);

  // 处理 Footer 配置
  const footerConfig: ModalFooterConfig | null = React.useMemo(() => {
    if (footer === null) {
      return null;
    }

    // 未提供 footer 时，使用默认模板
    if (footer === undefined) {
      const cancelLabel = props.cancelText ?? labels.cancel;
      const okLabel = props.okText ?? labels.confirm;
      return {
        render: () => (
          <div className='flex justify-end gap-10px'>
            {/* 默认按钮提供统一圆角，文案可通过 cancelText/okText 覆盖 */}
            {/* Default buttons ship with rounded corners; text can be overridden via cancelText/okText */}
            <Button onClick={onCancel} className='px-20px min-w-80px' style={{ borderRadius: 8 }}>
              {cancelLabel}
            </Button>
            <Button
              type='primary'
              onClick={props.onOk as ((e: Event) => void) | undefined}
              loading={props.confirmLoading}
              className='px-20px min-w-80px'
              style={{ borderRadius: 8 }}
            >
              {okLabel}
            </Button>
          </div>
        ),
      };
    }

    // 如果是 ReactNode，包装为配置对象
    if (React.isValidElement(footer)) {
      return {
        render: () => footer,
      };
    }
    return footer as ModalFooterConfig;
  }, [footer, onCancel, props.cancelText, props.okText, props.onOk, props.confirmLoading, labels]);

  // 渲染 Header
  const renderHeader = () => {
    // 如果提供了自定义 render 函数
    if (headerConfig.render) {
      return (
        <div className={headerConfig.className} style={headerConfig.style}>
          {headerConfig.render()}
        </div>
      );
    }

    // 如果没有 title 也不显示关闭按钮，不渲染 header
    if (!headerConfig.title && !headerConfig.showClose) {
      return null;
    }

    // standard 变体：标题 + 可选副标题竖排，自带标准内边距与下分隔线
    if (isStandard) {
      return (
        <div className={classNames(STD_HEADER_CLASS, headerConfig.className)} style={headerConfig.style}>
          <div className='min-w-0 flex-1'>
            {headerConfig.title && <h3 className={STD_TITLE_CLASS}>{headerConfig.title}</h3>}
            {/* 副标题可选：不传时整行不渲染、不占位、不留白 */}
            {headerConfig.subtitle ? <p className={STD_SUBTITLE_CLASS}>{headerConfig.subtitle}</p> : null}
          </div>
          {headerConfig.showClose && (
            <button onClick={onCancel} className={STD_CLOSE_BTN_CLASS} aria-label='Close'>
              {headerConfig.closeIcon || <Close size={20} fill='currentColor' />}
            </button>
          )}
        </div>
      );
    }

    // 默认 header 布局
    const headerClassName = classNames(HEADER_BASE_CLASS, headerConfig.className);

    const headerStyle: CSSProperties = {
      borderBottom: '1px solid var(--bg-3)',
      ...headerConfig.style,
    };

    return (
      <div className={headerClassName} style={headerStyle}>
        {headerConfig.title && <h3 className={TITLE_BASE_CLASS}>{headerConfig.title}</h3>}
        {headerConfig.showClose && (
          <button onClick={onCancel} className={CLOSE_BUTTON_CLASS} aria-label='Close'>
            {headerConfig.closeIcon || <Close size={20} fill='var(--bg-6)' />}
          </button>
        )}
      </div>
    );
  };

  // 渲染 Footer
  const renderFooter = () => {
    if (!footerConfig) {
      return null;
    }

    if (footerConfig.render) {
      // standard 变体或显式 divider === true 时，组件统一渲染上分隔线 + 标准内边距（内容↔按钮区）；
      // 默认（未显式开启）退回裸容器，保持既有行为，便于逐个弹窗平滑迁移。
      const useDivider = isStandard || footerConfig.divider === true;
      const footerClassName = classNames(
        useDivider ? FOOTER_DIVIDER_CLASS : FOOTER_BASE_CLASS,
        isStandard && 'aionui-modal-std-footer',
        footerConfig.className
      );
      return (
        <div className={footerClassName} style={footerConfig.style}>
          {footerConfig.render()}
        </div>
      );
    }

    return null;
  };

  return (
    <Modal
      {...props}
      title={null}
      closable={false}
      footer={null}
      onCancel={onCancel}
      className={classNames('aionui-modal', isStandard && 'aionui-modal-standard', className)}
      style={finalStyle}
      getPopupContainer={() => document.body}
    >
      <div
        className={classNames('aionui-modal-wrapper', isStandard && 'flex flex-col min-h-0')}
        style={{ borderRadius: borderRadiusVal }}
      >
        {renderHeader()}
        <div
          className={classNames(
            'aionui-modal-body-content',
            isStandard && STD_BODY_LAYOUT_CLASS,
            // 默认套用标准内边距；调用方显式传 contentStyle.padding 时改由 inline style 生效（可为 0）
            isStandard && !stdBodyHasCustomPadding && STD_BODY_PADDING_CLASS
          )}
          style={stdBodyHasCustomPadding ? { ...bodyInlineStyle, padding: paddingVal } : bodyInlineStyle}
        >
          {children}
        </div>
        {renderFooter()}
      </div>
    </Modal>
  );
};

AionModal.displayName = 'AionModal';

export default AionModal;
