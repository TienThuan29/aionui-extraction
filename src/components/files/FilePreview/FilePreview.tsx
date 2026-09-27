/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { Close } from '@icon-park/react';
import React from 'react';
import { useUi } from '../../../provider';
import { formatByteSize } from '../../../utils/format';
import { Image, Tooltip } from '@arco-design/web-react';
import fileIcon from './file-icon.svg';

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']);

const isImageFile = (path: string): boolean => {
  const ext = path.toLowerCase().slice(path.lastIndexOf('.'));
  return IMAGE_EXTS.has(ext);
};

const getFileExtension = (fileName: string): string => {
  const lastDotIndex = fileName.lastIndexOf('.');
  return lastDotIndex > -1 ? fileName.substring(lastDotIndex).toLowerCase() : '';
};

export type FilePreviewProps = {
  /** File path; the name, extension and image/file look come from it. */
  path: string;
  /** File size in bytes; shows a placeholder until known. */
  size?: number;
  /** Image data/URL for image files; a skeleton shows until it is provided. */
  imageSrc?: string;
  /** Called by the remove (×) button. */
  onRemove: () => void;
  /**
   * Hide the remove button.
   * @default false
   */
  readonly?: boolean;
  /** Optional tooltip shown on the chip (e.g. "sent as a file path"). */
  hint?: string;
};

const FilePreview: React.FC<FilePreviewProps> = ({ path, size, imageSrc, onRemove, readonly = false, hint }) => {
  // Defensive check: ensure path is a string
  if (typeof path !== 'string') {
    console.error('[FilePreview] Invalid path type:', typeof path, path);
    return null;
  }

  const isImage = isImageFile(path);
  // 直接从路径中提取文件名，不清理时间戳后缀
  // Extract filename directly from path without cleaning timestamp suffix
  const file_name = path.split(/[\\/]/).pop() || '';
  const fileExt = getFileExtension(path).toUpperCase().replace('.', '');
  const { locale } = useUi();
  const imageUrl = imageSrc ?? '';
  const fileSize = size === undefined ? '' : formatByteSize(size, locale);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  const withHint = (chip: React.ReactElement) => (hint ? <Tooltip content={hint}>{chip}</Tooltip> : chip);

  if (isImage) {
    return withHint(
      <div className='relative inline-block'>
        <div className='rd-8px overflow-hidden border-1 border-solid b-color-border-2'>
          <Image
            src={imageUrl}
            alt={file_name}
            width={60}
            height={60}
            className='object-cover cursor-pointer'
            style={{ display: imageUrl ? 'block' : 'none' }}
            preview={Boolean(imageUrl)}
          />
          {!imageUrl && <div className='w-60px h-60px bg-bg-3'></div>}
        </div>
        {!readonly && (
          <div
            className='absolute -top-4px -end-4px w-16px h-16px rd-50% bg-white dark:bg-gray-700 cursor-pointer flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10 border-1 border-solid border-gray-200 dark:border-gray-600'
            onClick={handleRemove}
          >
            <Close theme='filled' size='10' fill='var(--text-secondary)' />
          </div>
        )}
      </div>
    );
  }

  return withHint(
    <div className='relative inline-block mb-10px'>
      <div
        className='h-60px flex items-center gap-12px px-12px rd-8px bg-bg-2 border border-solid'
        style={{ borderColor: 'var(--border-base)', boxShadow: '0 0 0 1px rgba(0,0,0,0.02)' }}
      >
        <div className='w-40px h-40px rd-8px flex items-center justify-center flex-shrink-0'>
          <img className='w-full h-full object-contain' src={fileIcon} alt='File Icon' />
        </div>
        <div className='flex flex-col gap-2px min-w-0'>
          <span className='text-14px text-t-primary max-w-150px truncate'>{file_name}</span>
          <span className='text-12px text-t-secondary'>
            {fileExt}: {fileSize || '...'}
          </span>
        </div>
      </div>
      {!readonly && (
        <div
          className='absolute -top-4px -end-4px w-16px h-16px rd-50% bg-white dark:bg-gray-700 cursor-pointer flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10 border-1 border-solid border-gray-200 dark:border-gray-600'
          onClick={handleRemove}
        >
          <Close theme='filled' size='10' fill='var(--text-secondary)' />
        </div>
      )}
    </div>
  );
};

export default FilePreview;
