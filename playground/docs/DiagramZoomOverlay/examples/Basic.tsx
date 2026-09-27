import { Button } from '@arco-design/web-react';
import { useState } from 'react';
import { DiagramZoomOverlay } from '@aionui/ui/markdown';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" width="480" height="240">
  <rect x="10" y="40" width="80" height="40" rx="6" fill="#3b82f6"/>
  <rect x="150" y="40" width="80" height="40" rx="6" fill="#22c55e"/>
  <path d="M90 60 H150" stroke="#64748b" stroke-width="3" marker-end="url(#a)"/>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#64748b"/></marker></defs>
</svg>`;

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Zoom diagram</Button>
      {open && <DiagramZoomOverlay svg={svg} ariaLabel='Flow diagram' onClose={() => setOpen(false)} />}
    </>
  );
}
