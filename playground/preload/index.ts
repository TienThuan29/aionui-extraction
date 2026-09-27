import { contextBridge, ipcRenderer } from 'electron';

const windowControls = {
  minimize: () => ipcRenderer.invoke('win:minimize'),
  toggleMaximize: () => ipcRenderer.invoke('win:toggleMaximize'),
  close: () => ipcRenderer.invoke('win:close'),
  isMaximized: (): Promise<boolean> => ipcRenderer.invoke('win:isMaximized'),
  onMaximizedChange: (cb: (maximized: boolean) => void) => {
    const listener = (_: unknown, maximized: boolean) => cb(maximized);
    ipcRenderer.on('win:maximized', listener);
    return () => void ipcRenderer.removeListener('win:maximized', listener);
  },
};

export type PlaygroundWindowControls = typeof windowControls;

contextBridge.exposeInMainWorld('playground', { windowControls });
