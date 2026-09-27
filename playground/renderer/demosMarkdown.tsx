import type React from 'react';
import { Diff2Html, Markdown } from '@aionui/ui/markdown';

type Demo = { name: string; render: () => React.ReactNode };

const SAMPLE = `# Release notes

Some **bold**, _italic_ and \`inline code\`, plus a [link](https://example.com).

| Feature | Status |
| --- | :---: |
| Tables | ✅ |
| Math $E = mc^2$ | ✅ |

\`\`\`ts
export function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

\`\`\`mermaid
graph LR
  A[Request] --> B{Cached?}
  B -- yes --> C[Serve]
  B -- no --> D[Fetch] --> C
\`\`\`
`;

const DIFF = `--- a/src/greet.ts
+++ b/src/greet.ts
@@ -1,3 +1,3 @@
 export function greet(name: string): string {
-  return 'Hello ' + name;
+  return \`Hello, \${name}!\`;
 }
`;

export const markdownDemos: Demo[] = [
  {
    name: 'Markdown',
    render: () => (
      <Markdown onOpenPreview={(source, { title }) => console.info('[playground] open preview', title, source.length)}>
        {SAMPLE}
      </Markdown>
    ),
  },
  { name: 'Diff2Html', render: () => <Diff2Html diff={DIFF} file_path='src/greet.ts' /> },
];
