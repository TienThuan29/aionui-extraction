import { useRef, useState } from 'react';
import { MentionMenuShell } from '@aionui/ui';

const PAGE = 10;
const TOTAL = 40;

export default function Example() {
  const [count, setCount] = useState(PAGE);
  const [loading, setLoading] = useState(false);
  const inFlight = useRef(false);

  const loadMore = () => {
    if (inFlight.current || count >= TOTAL) return; // onReachEnd may fire repeatedly
    inFlight.current = true;
    setLoading(true);
    setTimeout(() => {
      setCount((n) => Math.min(TOTAL, n + PAGE));
      setLoading(false);
      inFlight.current = false;
    }, 600);
  };

  return (
    <div className='w-360px'>
      <MentionMenuShell
        label='Members'
        title='Members'
        hint={`${count} of ${TOTAL}`}
        activeIndex={0}
        itemCount={count}
        loading={loading}
        maxHeight='200px'
        onReachEnd={loadMore}
      >
        {Array.from({ length: count }, (_, i) => (
          <div key={i} role='option' aria-selected={i === 0} className='px-10px py-6px text-13px'>
            member-{i + 1}
          </div>
        ))}
        {loading && <div className='px-10px py-6px text-13px text-t-secondary'>Loading…</div>}
      </MentionMenuShell>
    </div>
  );
}
