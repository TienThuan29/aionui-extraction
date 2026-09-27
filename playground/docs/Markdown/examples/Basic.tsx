import { Markdown } from '@aionui/ui/markdown';

const source = `## Release notes

Some **bold**, _italic_, ~~struck~~ and \`inline code\`.

- [x] Component docs
- [ ] Search

| Feature | Status |
| --- | :---: |
| Tables | ✅ |
| Math $E = mc^2$ | ✅ |

$$
\\int_0^1 x^2 \\, dx = \\frac{1}{3}
$$

\`\`\`ts
export function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`
`;

export default function Example() {
  return <Markdown>{source}</Markdown>;
}
