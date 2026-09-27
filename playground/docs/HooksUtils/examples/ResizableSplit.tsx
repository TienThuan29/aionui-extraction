import { useResizableSplit } from '@aionui/ui';

export default function Example() {
  const { splitRatio, dragHandle } = useResizableSplit({
    defaultWidth: 35,
    minWidth: 20,
    maxWidth: 70,
    storageKey: 'docs.split-demo',
  });
  return (
    <div className='flex h-160px border border-solid border-b-base rounded-8px overflow-hidden text-13px'>
      <div className='relative bg-2 p-12px' style={{ width: `${splitRatio}%` }}>
        Sidebar · {Math.round(splitRatio)}%{dragHandle}
      </div>
      <div className='flex-1 p-12px'>Content</div>
    </div>
  );
}
