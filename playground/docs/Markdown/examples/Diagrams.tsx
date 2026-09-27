import { Message } from '@arco-design/web-react';
import { Markdown } from '@aionui/ui/markdown';

const source = `\`\`\`mermaid
graph LR
  A[Request] --> B{Cached?}
  B -- yes --> C[Serve]
  B -- no --> D[Fetch] --> C
\`\`\`

\`\`\`wavedrom
{ signal: [
  { name: 'clk',  wave: 'p.....' },
  { name: 'data', wave: 'x.34.x', data: ['head', 'body'] },
  { name: 'req',  wave: '0.1..0' }
] }
\`\`\`
`;

export default function Example() {
  return (
    <Markdown
      onOpenPreview={(content, { title }) => Message.info(`Open "${title}" (${content.length} chars) in a panel`)}
    >
      {source}
    </Markdown>
  );
}
