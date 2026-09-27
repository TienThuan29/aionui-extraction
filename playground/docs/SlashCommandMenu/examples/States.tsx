import { SlashCommandMenu } from '@aionui/ui';

const noop = () => {};

export default function Example() {
  return (
    <div className='grid grid-cols-2 gap-16px max-w-640px'>
      <SlashCommandMenu
        title='Commands'
        items={[]}
        activeIndex={0}
        loading
        loadingText='Loading commands…'
        onHoverItem={noop}
        onSelectItem={noop}
        emptyText='No commands'
      />
      <SlashCommandMenu
        title='Commands'
        items={[]}
        activeIndex={0}
        onHoverItem={noop}
        onSelectItem={noop}
        emptyText='No matching commands'
      />
    </div>
  );
}
