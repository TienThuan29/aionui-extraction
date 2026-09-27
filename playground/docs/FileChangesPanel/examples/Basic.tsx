import { Message } from '@arco-design/web-react';
import { FileChangesPanel, type FileChangeItem } from '@aionui/ui';

const files: FileChangeItem[] = [
  { file_name: 'index.ts', fullPath: 'src/index.ts', insertions: 12, deletions: 3 },
  { file_name: 'App.tsx', fullPath: 'src/App.tsx', insertions: 40, deletions: 0 },
  { file_name: 'README.md', fullPath: 'README.md', insertions: 0, deletions: 8 },
];

export default function Example() {
  return (
    <FileChangesPanel
      className='max-w-560px'
      title={`${files.length} files changed`}
      files={files}
      onFileClick={(file) => Message.info(`Preview ${file.fullPath}`)}
      onDiffClick={(file) => Message.info(`Diff of ${file.fullPath}`)}
    />
  );
}
