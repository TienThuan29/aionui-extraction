import { Button } from '@arco-design/web-react';
import { Brain, Tool } from '@icon-park/react';
import { useState } from 'react';
import { MobileActionSheet } from '@aionui/ui';

const models = [
  { key: 'sonnet', label: 'Claude Sonnet', description: 'Balanced' },
  { key: 'opus', label: 'Claude Opus', description: 'Most capable' },
  { key: 'haiku', label: 'Claude Haiku', description: 'Fastest' },
];
const tools = ['Web search', 'File access', 'Terminal'];

export default function Example() {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState('sonnet');
  const [enabled, setEnabled] = useState<string[]>(['Web search']);
  const toggle = (key: string) =>
    setEnabled((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]));

  return (
    <>
      <Button onClick={() => setOpen(true)}>Settings…</Button>
      <MobileActionSheet
        open={open}
        title='Chat settings'
        onClose={() => setOpen(false)}
        entries={[
          {
            key: 'model',
            icon: <Brain />,
            label: 'Model',
            meta: models.find((m) => m.key === model)?.label,
            submenu: {
              title: 'Model',
              options: models.map((m) => ({ ...m, active: m.key === model })),
              onSelect: setModel,
            },
          },
          {
            key: 'tools',
            icon: <Tool />,
            label: 'Tools',
            meta: `${enabled.length} on`,
            submenu: {
              title: 'Tools',
              multiSelect: true,
              options: tools.map((t) => ({ key: t, label: t, active: enabled.includes(t) })),
              onSelect: toggle,
            },
          },
        ]}
      />
    </>
  );
}
