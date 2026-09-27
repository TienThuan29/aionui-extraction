import type { DocPage } from '../types';

const page: DocPage = {
  title: 'DirInputItem',
  group: 'Inputs',
  order: 4,
  description:
    'An Arco `Form.Item` that shows a directory path and a folder button. Clicking either opens your directory picker through `onBrowse`; the chosen path is written back to the form field.',
  components: ['DirInputItem'],
  examples: [
    {
      file: 'Basic',
      title: 'Basic',
      description: 'A fake picker that cycles through paths; returning `undefined` leaves the value unchanged.',
    },
  ],
  snippets: [
    {
      title: 'Electron picker',
      description: 'In Electron, resolve `onBrowse` with `dialog.showOpenDialog` from the main process.',
      language: 'typescript',
      code: `// main.ts
ipcMain.handle('pick-dir', async (_e, defaultPath: string) => {
  const result = await dialog.showOpenDialog({ defaultPath, properties: ['openDirectory'] });
  return result.canceled ? undefined : result.filePaths[0];
});

// renderer
<DirInputItem label='Work directory' field='workDir' onBrowse={(current) => window.api.pickDir(current)} />`,
    },
  ],
  notes: [
    'Must be rendered inside an Arco `Form`. The empty state text comes from UiProvider `labels.dirNotConfigured`.',
  ],
};

export default page;
