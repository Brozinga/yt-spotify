const { app, BrowserWindow, ipcMain } = require('electron');
const titleBarFunctions = require('../app/titlebar');
require('../app');

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

// Menu.setApplicationMenu(null);
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
    icon: path.join(__dirname, '../src/assets/img/spotify-icon.png')
  });

  mainWindow.removeMenu()
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.resolve(__dirname, '..', 'build', 'index.html')}`,
  );


  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  titleBarFunctions(mainWindow);
}

app.allowRendererProcessReuse = true;
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
