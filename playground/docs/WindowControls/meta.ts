import type { DocPage } from '../types';

const page: DocPage = {
  title: 'WindowControls',
  group: 'Layout',
  order: 9,
  description:
    'Minimize, maximize/restore and close buttons for frameless windows, styled like native Windows chrome. The host owns the window state and actions.',
  components: ['WindowControls'],
  examples: [
    {
      file: 'Basic',
      title: 'Basic',
      description: 'Wired to local state here; in an Electron app the callbacks call into the main process.',
    },
  ],
  snippets: [
    {
      title: 'Electron wiring',
      description: 'Expose the window actions from a preload script, then pass them to WindowControls.',
      language: 'typescript',
      code: `// preload.ts
contextBridge.exposeInMainWorld('win', {
  minimize: () => ipcRenderer.invoke('win:minimize'),
  toggleMaximize: () => ipcRenderer.invoke('win:toggleMaximize'),
  close: () => ipcRenderer.invoke('win:close'),
  isMaximized: () => ipcRenderer.invoke('win:isMaximized'),
  onMaximizedChange: (cb: (maximized: boolean) => void) => {
    const listener = (_: unknown, maximized: boolean) => cb(maximized);
    ipcRenderer.on('win:maximized', listener);
    return () => ipcRenderer.removeListener('win:maximized', listener);
  },
});

// main.ts
const win = new BrowserWindow({ frame: false /* … */ });
ipcMain.handle('win:minimize', () => win.minimize());
ipcMain.handle('win:toggleMaximize', () => (win.isMaximized() ? win.unmaximize() : win.maximize()));
ipcMain.handle('win:close', () => win.close());
ipcMain.handle('win:isMaximized', () => win.isMaximized());
win.on('maximize', () => win.webContents.send('win:maximized', true));
win.on('unmaximize', () => win.webContents.send('win:maximized', false));`,
    },
  ],
  notes: [
    'Place it at the right end of a draggable titlebar (-webkit-app-region: drag); the buttons opt out of dragging.',
  ],
};

export default page;
