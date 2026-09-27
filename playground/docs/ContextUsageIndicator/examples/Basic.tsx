import { ContextUsageIndicator, type TokenUsageData } from '@aionui/ui';

const usage = (total: number): TokenUsageData => ({
  total_tokens: total,
  breakdown: { input_tokens: Math.round(total * 0.8), output_tokens: Math.round(total * 0.2) },
  cost: { amount: total / 400_000, currency: 'USD' },
});

export default function Example() {
  return (
    <div className='flex items-center gap-24px text-13px'>
      {[40_000, 152_000, 190_000].map((total) => (
        <span key={total} className='flex items-center gap-8px'>
          <ContextUsageIndicator size={28} context_limit={200_000} tokenUsage={usage(total)} />
          {Math.round((total / 200_000) * 100)}%
        </span>
      ))}
    </div>
  );
}
