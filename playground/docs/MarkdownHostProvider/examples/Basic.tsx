import { Message } from '@arco-design/web-react';
import { Markdown, MarkdownHostProvider } from '@aionui/ui/markdown';

const customCss = `
a { color: #16a34a; }
blockquote { border-left: 3px solid #16a34a; margin: 0; padding-left: 12px; }
`;

export default function Example() {
  return (
    <MarkdownHostProvider customCss={customCss} onOpenLink={(href) => Message.info(`Provider opens ${href}`)}>
      <div className='flex flex-col gap-12px'>
        <Markdown>{'> First message with a [link](https://aionui.com).'}</Markdown>
        <Markdown onOpenLink={(href) => Message.warning(`This message opens ${href} itself`)}>
          {'> Second message overrides only `onOpenLink`: [link](https://example.com).'}
        </Markdown>
      </div>
    </MarkdownHostProvider>
  );
}
