import { MermaidBlock } from '@aionui/ui/markdown';

const code = `sequenceDiagram
  participant U as User
  participant A as Agent
  U->>A: Refactor the parser
  A->>A: Read files
  A-->>U: Proposed diff`;

export default function Example() {
  return <MermaidBlock code={code} />;
}
