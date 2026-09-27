import { ContextUsageIndicator } from '@aionui/ui';

export default function Example() {
  return <ContextUsageIndicator size={28} context_limit={0} tokenUsage={{ total_tokens: 58_300 }} />;
}
