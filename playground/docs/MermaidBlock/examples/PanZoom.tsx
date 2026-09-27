import { Message } from '@arco-design/web-react';
import { MarkdownHostProvider, MermaidBlock } from '@aionui/ui/markdown';

const code = `graph TD
  A[Idea] --> B[Design]
  B --> C{Approved?}
  C -- yes --> D[Build]
  C -- no --> B
  D --> E[Ship]`;

export default function Example() {
  return (
    <MarkdownHostProvider onOpenPreview={(_content, { title }) => Message.info(`Open "${title}" in a panel`)}>
      <MermaidBlock code={code} enablePanZoom />
    </MarkdownHostProvider>
  );
}
