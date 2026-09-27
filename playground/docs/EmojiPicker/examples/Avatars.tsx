import { Button } from '@arco-design/web-react';
import { useState } from 'react';
import { EmojiPicker } from '@aionui/ui';

const avatar = (fill: string) =>
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='16' fill='${encodeURIComponent(fill)}'/></svg>`;

const builtinAvatars = [
  { id: 'blue', label: 'Blue', src: avatar('#3b82f6') },
  { id: 'green', label: 'Green', src: avatar('#22c55e') },
  { id: 'orange', label: 'Orange', src: avatar('#f97316') },
];

export default function Example() {
  const [value, setValue] = useState(builtinAvatars[0].src);
  const isImage = value.startsWith('data:') || value.startsWith('http');
  return (
    <EmojiPicker value={value} onChange={setValue} builtinAvatars={builtinAvatars}>
      <Button className='text-20px'>{isImage ? <img src={value} alt='' className='w-20px h-20px' /> : value}</Button>
    </EmojiPicker>
  );
}
