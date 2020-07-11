const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');

let win;

function createWindow(){
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        },
        icon: 'assets//icon.ico'
    });

    win.removeMenu();

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index-electron.html'),
        protocol: 'file',
        slashes: true
    }));

    win.on('close', () => {
        win = null;
    });

    //win.webContents.openDevTools();
}


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
})