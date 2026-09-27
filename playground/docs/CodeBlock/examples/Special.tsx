import { CodeBlock } from '@aionui/ui/markdown';

const diff = `@@ -1,3 +1,3 @@
 export function greet(name: string) {
-  return 'Hello ' + name;
+  return \`Hello, \${name}!\`;
 }`;

export default function Example() {
  return (
    <div className='flex flex-col gap-16px'>
      <CodeBlock className='language-diff'>{diff}</CodeBlock>
      <CodeBlock className='language-math'>{'\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\n'}</CodeBlock>
    </div>
  );
}
