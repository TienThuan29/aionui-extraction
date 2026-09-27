import { CollapsibleContent } from '@aionui/ui';

export default function Example() {
  return (
    <CollapsibleContent maxHeight={80}>
      <div className='text-13px'>One short line never collapses.</div>
    </CollapsibleContent>
  );
}
