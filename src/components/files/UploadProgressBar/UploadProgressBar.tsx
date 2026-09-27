/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useUi } from '../../../provider';
import { CloseSmall } from '@icon-park/react';

export type UploadProgressItem = { id: number; name: string; percent: number };

export type UploadProgressBarProps = {
  isUploading: boolean;
  activeCount: number;
  overallPercent: number;
  uploads: UploadProgressItem[];
  /** Abort a single upload; the row's cancel button is hidden when omitted. */
  onAbort?: (id: number) => void;
};

/**
 * Thin progress bar shown while files are being uploaded. Renders nothing when idle.
 * Each in-flight upload gets a row with its filename, percent, and a cancel button.
 */
const UploadProgressBar: React.FC<UploadProgressBarProps> = ({
  isUploading,
  activeCount,
  overallPercent,
  uploads,
  onAbort,
}) => {
  const { labels } = useUi();

  if (!isUploading) return null;

  return (
    <div className='px-12px py-4px text-12px color-text-3'>
      <div className='flex justify-between mb-2px'>
        <span>{labels.uploading(activeCount)}</span>
        <span>{overallPercent}%</span>
      </div>
      <div className='h-3px rd-2px bg-fill-3 overflow-hidden'>
        <div
          className='h-full rd-2px bg-primary-6 transition-width duration-200 ease'
          style={{ width: `${overallPercent}%` }}
        />
      </div>
      {uploads.length > 0 && (
        <ul className='mt-6px flex flex-col gap-4px list-none p-0 m-0'>
          {uploads.map((upload) => (
            <li key={upload.id} className='flex items-center gap-8px py-2px' data-testid='upload-progress-item'>
              <span className='flex-1 min-w-0 truncate' title={upload.name}>
                {upload.name}
              </span>
              <span className='flex-shrink-0 tabular-nums'>{upload.percent}%</span>
              {onAbort && (
                <button
                  type='button'
                  aria-label={labels.cancelUpload}
                  title={labels.cancelUpload}
                  className='flex-shrink-0 inline-flex items-center justify-center w-16px h-16px rd-full b-none bg-transparent cursor-pointer color-text-3 hover:color-text-1 hover:bg-fill-3 p-0'
                  onClick={() => onAbort(upload.id)}
                  data-testid='upload-cancel-btn'
                >
                  <CloseSmall theme='outline' size='12' strokeWidth={3} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UploadProgressBar;
