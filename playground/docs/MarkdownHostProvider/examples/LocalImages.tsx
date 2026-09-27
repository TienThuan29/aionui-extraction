import { Markdown, MarkdownHostProvider } from '@aionui/ui/markdown';

export default function Example() {
  return (
    <MarkdownHostProvider
      renderLocalImage={({ src, alt }) => (
        <span className='inline-flex items-center gap-6px px-8px py-4px rounded-6px bg-fill-2 text-12px'>
          🖼 {alt || 'image'} <code>{src}</code>
        </span>
      )}
    >
      <Markdown>{'Screenshot: ![login page](/Users/me/Desktop/login.png)'}</Markdown>
    </MarkdownHostProvider>
  );
}
