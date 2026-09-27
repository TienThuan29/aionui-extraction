import { Message } from '@arco-design/web-react';
import { useState } from 'react';
import { Diff2Html, MarkdownHostProvider } from '@aionui/ui/markdown';

const diff = `--- a/README.md
+++ b/README.md
@@ -1,2 +1,3 @@
 # AionUi components
-Reusable React components.
+Reusable React components with docs.
+Run \`bun run playground\` to browse them.
`;

export default function Example() {
  const [loading, setLoading] = useState(false);
  return (
    <MarkdownHostProvider
      diffPreviewLoading={loading}
      onPreviewDiff={(request) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          Message.info(`Preview ${request.relativePath} (${request.language})`);
        }, 800);
      }}
    >
      <Diff2Html diff={diff} title='README.md' />
    </MarkdownHostProvider>
  );
}
