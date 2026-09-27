import { CodeBlock } from '@aionui/ui/markdown';

const code = `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`;

export default function Example() {
  return <CodeBlock className='language-tsx'>{code}</CodeBlock>;
}
