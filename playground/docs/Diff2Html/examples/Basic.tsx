import { Diff2Html } from '@aionui/ui/markdown';

const diff = `--- a/src/greet.ts
+++ b/src/greet.ts
@@ -1,4 +1,4 @@
 export function greet(name: string): string {
-  return 'Hello ' + name;
+  return \`Hello, \${name}!\`;
 }

`;

export default function Example() {
  return <Diff2Html diff={diff} />;
}
