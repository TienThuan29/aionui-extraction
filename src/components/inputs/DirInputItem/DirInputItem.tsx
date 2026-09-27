/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { iconColors } from '../../../tokens/colors';
import { Button, Form, Tooltip } from '@arco-design/web-react';
import { FolderOpen } from '@icon-park/react';
import React from 'react';
import { useUi } from '../../../provider';

/**
 * An Arco Form.Item that shows a directory path and opens the host's directory picker.
 */
export type DirInputItemProps = {
  /** Form item label. */
  label: string;
  /** Form field name that holds the path. */
  field: string;
  /** Opens the host's directory picker; resolves to the chosen path, or undefined when cancelled. */
  onBrowse: (currentPath: string) => Promise<string | undefined>;
  /** Tooltip/aria-label of the browse button. */
  browseLabel?: string;
};

const DirInputItem: React.FC<DirInputItemProps> = ({ label, field, onBrowse, browseLabel }) => {
  const { labels } = useUi();
  return (
    <Form.Item label={label} field={field}>
      {(value, form) => {
        const current_value = form.getFieldValue(field) || '';
        const actionTooltip = browseLabel;

        const handlePick = () => {
          onBrowse(current_value)
            .then((picked) => {
              if (picked) {
                form.setFieldValue(field, picked);
              }
            })
            .catch((error) => {
              console.error('Failed to open directory dialog:', error);
            });
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          handlePick();
        };

        return (
          <div
            className='aion-dir-input h-[32px] flex items-center rounded-8px border border-solid border-transparent ps-14px bg-[var(--fill-0)] cursor-pointer'
            tabIndex={0}
            onClick={handlePick}
            onKeyDown={handleKeyDown}
          >
            <Tooltip content={current_value || labels.dirNotConfigured} position='top'>
              {/* Paths are code-like; without dir=ltr the leading slash flips to the end under RTL. */}
              <div dir='ltr' className='flex-1 min-w-0 text-13px text-t-primary truncate rtl-text-right'>
                {current_value || labels.dirNotConfigured}
              </div>
            </Tooltip>
            <Tooltip content={actionTooltip} position='top'>
              <Button
                type='text'
                aria-label={actionTooltip}
                style={{
                  borderInlineStart: '1px solid var(--color-border-2)',
                  borderStartStartRadius: 0,
                  borderStartEndRadius: 8,
                  borderEndEndRadius: 8,
                  borderEndStartRadius: 0,
                }}
                icon={<FolderOpen theme='outline' size='18' fill={iconColors.primary} />}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePick();
                }}
              />
            </Tooltip>
          </div>
        );
      }}
    </Form.Item>
  );
};

export default DirInputItem;
