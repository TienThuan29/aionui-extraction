import { app, BrowserWindow, ipcMain } from 'electron';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Frameless so WindowControls can be exercised for real.
function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1280,
    // Screenshot mode can use a taller window to capture whole docs pages.
    height: Number(process.env.PLAYGROUND_SHOT_HEIGHT) || 860,
    frame: false,
    // Stay visible even in screenshot mode: hidden windows stop painting and capturePage() returns stale frames.
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      backgroundThrottling: false,
    },
  });

  ipcMain.handle('win:minimize', () => win.minimize());
  ipcMain.handle('win:toggleMaximize', () => (win.isMaximized() ? win.unmaximize() : win.maximize()));
  ipcMain.handle('win:close', () => win.close());
  ipcMain.handle('win:isMaximized', () => win.isMaximized());
  win.on('maximize', () => win.webContents.send('win:maximized', true));
  win.on('unmaximize', () => win.webContents.send('win:maximized', false));

  if (process.env.ELECTRON_RENDERER_URL) void win.loadURL(process.env.ELECTRON_RENDERER_URL);
  else void win.loadFile(join(__dirname, '../renderer/index.html'));
  return win;
}

/**
 * Screenshot mode: PLAYGROUND_SHOTS=<dir> renders every docs page in each theme/layout,
 * writes <page>--<theme>-<layout>.png, then quits. The renderer drives it via the hash route.
 */
async function captureAll(win: BrowserWindow, dir: string): Promise<void> {
  /* oxlint-disable no-await-in-loop -- one shared window: routes must render and capture strictly in order */
  mkdirSync(dir, { recursive: true });
  await new Promise<void>((done) => win.webContents.once('did-finish-load', () => done()));
  const pages: string[] = await win.webContents.executeJavaScript('window.__PLAYGROUND_DEMOS__');
  for (const page of pages) {
    for (const theme of ['light', 'dark']) {
      for (const layout of ['desktop', 'mobile']) {
        await win.webContents.executeJavaScript(
          `window.location.hash = ${JSON.stringify(`#/${page}?theme=${theme}&layout=${layout}`)}`
        );
        await new Promise((r) => setTimeout(r, 700));
        const image = await win.webContents.capturePage();
        writeFileSync(join(dir, `${page}--${theme}-${layout}.png`), image.toPNG());
      }
    }
  }
}

void app.whenReady().then(async () => {
  const win = createWindow();
  const shots = process.env.PLAYGROUND_SHOTS;
  if (shots) {
    await captureAll(win, shots);
    app.quit();
  }
});

app.on('window-all-closed', () => app.quit());
