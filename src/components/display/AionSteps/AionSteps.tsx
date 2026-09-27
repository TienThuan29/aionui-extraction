/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { Steps } from '@arco-design/web-react';
import type { StepsProps } from '@arco-design/web-react/es/Steps';
import classNames from 'classnames';
import React from 'react';

/**
 * Steps component props
 */
export interface AionStepsProps extends StepsProps {
  /** Additional class name */
  className?: string;
}

/**
 * Arco Steps with the AionUi brand colors and finished-state styling. Supports the full
 * Arco Steps API; declare steps with `AionSteps.Step`.
 *
 * @see arco-override.css for custom styles (.aionui-steps)
 */
const AionSteps: React.FC<AionStepsProps> & { Step: typeof Steps.Step } = ({ className, ...props }) => {
  return <Steps {...props} className={classNames('aionui-steps', className)} />;
};

AionSteps.displayName = 'AionSteps';

// 导出子组件 / Export sub-component
AionSteps.Step = Steps.Step;

export default AionSteps;
