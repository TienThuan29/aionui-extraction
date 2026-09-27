import { WavedromBlock } from '@aionui/ui/markdown';

const code = `{ signal: [
  { name: 'clk',   wave: 'p.......' },
  { name: 'valid', wave: '0.1..0..' },
  { name: 'data',  wave: 'x.345x..', data: ['a', 'b', 'c'] },
  { name: 'ready', wave: '1....0.1' },
] }`;

export default function Example() {
  return <WavedromBlock code={code} enablePanZoom />;
}
