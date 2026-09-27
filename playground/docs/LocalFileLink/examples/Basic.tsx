import { Message } from '@arco-design/web-react';
import { LocalFileLink, resolveLocalFileLinkReference } from '@aionui/ui/markdown';

const hrefs = ['/Users/me/project/src/App.tsx:12:5', '/home/me/project/README.md#L3-L9', 'C:\\work\\config.json'];

export default function Example() {
  return (
    <div className='flex flex-col items-start gap-8px text-14px'>
      {hrefs.map((href) => {
        const reference = resolveLocalFileLinkReference(href);
        return reference ? (
          <LocalFileLink
            key={href}
            reference={reference}
            onOpen={(path) => {
              Message.info(`Open ${path}`);
            }}
          />
        ) : null;
      })}
      <span>
        Read-only:{' '}
        <LocalFileLink reference={resolveLocalFileLinkReference('/tmp/output.log')!}>build log</LocalFileLink>
      </span>
    </div>
  );
}
