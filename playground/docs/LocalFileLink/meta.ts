import type { DocPage } from '../types';

const page: DocPage = {
  title: 'LocalFileLink',
  group: 'Markdown',
  order: 8,
  description:
    'The chip Markdown renders for links to local files: the file name, a line badge (`L12`, `L3-L9`) and a copy button for the original reference. Use it directly with `resolveLocalFileLinkReference`.',
  importFrom: '@aionui/ui/markdown',
  components: ['LocalFileLink'],
  examples: [
    {
      file: 'Basic',
      title: 'Basic',
      description:
        'Absolute POSIX and Windows paths, `:line:col` and `#Lx-Ly` suffixes. Without `onOpen` the chip is not clickable.',
    },
  ],
  notes: [
    'Recognized: `file:` URLs, Windows drive paths, and absolute paths under /Users, /home, /tmp, /private, /var, /mnt, /Volumes, or any absolute path ending in a file extension. `http(s)` links are never local.',
  ],
};

export default page;
