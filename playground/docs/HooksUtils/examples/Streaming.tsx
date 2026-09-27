import { Button } from '@arco-design/web-react';
import { useEffect, useRef, useState } from 'react';
import { useAutoScroll, useTypingAnimation } from '@aionui/ui';

const answer =
  'Sure. First, the parser reads the tokens. Then it builds the tree. Finally, each node is checked. '.repeat(6);

export default function Example() {
  const [streamed, setStreamed] = useState('Thinking… ');
  const [running, setRunning] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const { displayedContent, isAnimating } = useTypingAnimation({ content: streamed, speed: 120 });
  useAutoScroll({ containerRef: listRef, content: displayedContent });

  // Simulates a server sending chunks of text.
  useEffect(() => {
    if (!running) return undefined;
    let sent = 0;
    const timer = setInterval(() => {
      sent += 24;
      setStreamed('Thinking… ' + answer.slice(0, sent));
      if (sent >= answer.length) setRunning(false);
    }, 200);
    return () => clearInterval(timer);
  }, [running]);

  return (
    <div className='w-420px flex flex-col gap-8px'>
      <div ref={listRef} className='h-120px overflow-auto p-12px rounded-8px bg-2 text-13px leading-20px'>
        {displayedContent}
      </div>
      <div className='flex items-center gap-8px text-12px text-t-secondary'>
        <Button
          size='small'
          disabled={running}
          onClick={() => {
            setStreamed('Thinking… ');
            setRunning(true);
          }}
        >
          Stream an answer
        </Button>
        {isAnimating ? 'typing…' : 'idle'}
      </div>
    </div>
  );
}
