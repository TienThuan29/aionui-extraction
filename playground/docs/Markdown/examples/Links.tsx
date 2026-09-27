import { Message } from '@arco-design/web-react';
import { Markdown } from '@aionui/ui/markdown';

const source = `See the [docs](https://aionui.com) or open the files I changed:

- [App.tsx](/Users/me/project/src/App.tsx:12)
- [index.ts](/Users/me/project/src/index.ts#L3-L9)
- [config](C:\\\\work\\\\project\\\\config.json)
`;

export default function Example() {
  return (
    <Markdown
      onOpenLink={(href) => Message.info(`Open ${href}`)}
      onLocalFileLink={(path, reference) => {
        Message.info(`Open ${path}${reference?.line ? ` at line ${reference.line}` : ''}`);
      }}
    >
      {source}
    </Markdown>
  );
}
