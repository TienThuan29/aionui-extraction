import { Button } from '@arco-design/web-react';
import { useState } from 'react';
import { EmojiPicker } from '@aionui/ui';

export default function Example() {
  const [emoji, setEmoji] = useState('🤖');
  return (
    <EmojiPicker value={emoji} onChange={setEmoji}>
      <Button className='text-20px'>{emoji}</Button>
    </EmojiPicker>
  );
}
