import { Input } from '@arco-design/web-react';
import { useState } from 'react';
import { SlashCommandMenu, type SlashCommandMenuItem } from '@aionui/ui';

const commands: SlashCommandMenuItem[] = [
  { key: 'help', label: '/help', description: 'Show available commands' },
  { key: 'clear', label: '/clear', description: 'Clear the conversation', badge: 'builtin' },
  { key: 'model', label: '/model', description: 'Switch model' },
  { key: 'compact', label: '/compact', description: 'Summarize the history', badge: 'builtin' },
];

/** Indices of `query`'s characters, in order, inside `label` (a simple subsequence match). */
function match(label: string, query: string): number[] | null {
  const hits: number[] = [];
  let from = 1; // skip the leading "/"
  for (const char of query) {
    const at = label.indexOf(char, from);
    if (at < 0) return null;
    hits.push(at);
    from = at + 1;
  }
  return hits;
}

export default function Example() {
  const [text, setText] = useState('/');
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState('');

  const query = text.startsWith('/') ? text.slice(1).toLowerCase() : null;
  const items =
    query === null
      ? []
      : commands.flatMap((c) => {
          const hits = match(c.label, query);
          return hits ? [{ ...c, highlightIndices: hits }] : [];
        });

  const pick = (item: SlashCommandMenuItem) => {
    setPicked(item.label);
    setText('');
  };

  return (
    // The top padding leaves room for the menu, which opens upwards from the input.
    <div className='w-420px pt-240px'>
      <div className='relative'>
        {query !== null && (
          <div className='absolute left-0 right-0 bottom-[calc(100%+8px)]'>
            <SlashCommandMenu
              title='Commands'
              hint='↑↓ to navigate · Enter to pick'
              items={items}
              activeIndex={Math.min(active, items.length - 1)}
              onHoverItem={setActive}
              onSelectItem={pick}
              emptyText='No matching commands'
            />
          </div>
        )}
        <Input
          value={text}
          placeholder='Type / for commands'
          onChange={(value) => {
            setText(value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (!items.length) return;
            if (e.key === 'ArrowDown') setActive((i) => (i + 1) % items.length);
            if (e.key === 'ArrowUp') setActive((i) => (i - 1 + items.length) % items.length);
            if (e.key === 'Enter') pick(items[Math.min(active, items.length - 1)]);
          }}
        />
      </div>
      <div className='text-13px text-t-secondary mt-8px'>Picked: {picked || '—'}</div>
    </div>
  );
}
