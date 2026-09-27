import { render, screen, waitFor } from '@testing-library/react';
import { Diff2Html, LocalFileLink, MermaidBlock, resolveLocalFileLinkReference } from '../src/markdown';

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: '<svg><text>Request</text></svg>' }),
  },
}));

const DIFF = `--- a/a.ts
+++ b/a.ts
@@ -1 +1 @@
-old
+new
`;

describe('markdown fixes', () => {
  it('Diff2Html shows the title as text, never as HTML', () => {
    const { container } = render(<Diff2Html diff={DIFF} title='<img src=x onerror="alert(1)">' />);
    expect(container.querySelector('.d2h-file-name img')).toBeNull();
    expect(container.querySelector('.d2h-file-name')?.textContent).toBe('<img src=x onerror="alert(1)">');
  });

  it('LocalFileLink marks its line badge for the Markdown shadow stylesheet', () => {
    const reference = resolveLocalFileLinkReference('/Users/me/app.ts:12')!;
    render(<LocalFileLink reference={reference} />);
    expect(screen.getByText('L12').classList.contains('markdown-local-file-line')).toBe(true);
  });

  it('MermaidBlock displays the SVG in the font Mermaid measured with (document.body)', async () => {
    document.body.style.fontFamily = 'MeasureSans';
    try {
      render(<MermaidBlock code='graph LR; A-->B' />);
      await waitFor(() => expect(screen.getByTestId('mermaid-diagram').style.fontFamily).toBe('MeasureSans'));
    } finally {
      document.body.style.fontFamily = '';
    }
  });
});
