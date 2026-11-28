const { app, BrowserWindow, ipcMain } = require('electron');
const { getSystemStats, getGPUInfo } = require("./monitor");

ipcMain.handle("get-system-stats", async () => {
    return await getSystemStats();
});

ipcMain.handle("get-gpu-info", async () => {
    return await getGPUInfo();
});

function createWindow() {
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#0B0D10',
        title: 'Tracky',
        webPreferences: {
            preload: __dirname + "/preload.js",
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    window.loadFile('index.html');
}

app.whenReady().then(createWindow);