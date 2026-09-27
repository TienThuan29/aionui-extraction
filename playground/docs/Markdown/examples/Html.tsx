import { Markdown } from '@aionui/ui/markdown';

const source = `Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to search.

<details><summary>More</summary>Hidden until expanded.</details>`;

export default function Example() {
  return (
    <div className='grid grid-cols-2 gap-16px'>
      <div>
        <div className='text-12px text-t-secondary mb-4px'>Default (tags dropped)</div>
        <Markdown>{source}</Markdown>
      </div>
      <div>
        <div className='text-12px text-t-secondary mb-4px'>allowHtml</div>
        <Markdown allowHtml>{source}</Markdown>
      </div>
    </div>
  );
}
