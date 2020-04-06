const { ipcMain, app, remote } = require('electron');

function TitleBarFunction(mainWindow) {

    ipcMain.on('minimize', () => {
        mainWindow.minimize();
    })

    ipcMain.on('maxmize', () => {

        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    })

    ipcMain.on('close', () => {
        app.quit();
    })
}

module.exports = TitleBarFunction;