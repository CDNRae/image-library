const path = require("path");
const { app, BrowserWindow, protocol } = require("electron");
const isDev = require("electron-is-dev");
const fs = require("fs");
const { electron } = require("process");
const { ipcMain } = require('electron');
const DatabaseManager = require("../src/database/DatabaseManager");

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        frame: false,
        webPreferences: {
            width: 1024,
            height: 728,
            nodeIntegration: true,
            webSecurity: isDev !== true,
            enableRemoteModule: true,
        },
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    // Hide the menu bar
    win.setMenuBarVisibility(false)

    // Open the DevTools if in the dev environment
    if (isDev) {
        win.webContents.openDevTools({ mode: "detach" });
    }

    // Connect to the database
    let path = app.getPath("userData");
    path = path + "/data";
    let databaseManager = new DatabaseManager();

    if (!fs.existsSync(path)) {
        fs.mkdir(path);
    }

    databaseManager.initializeConnection(app.getPath("userData"));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    protocol.registerFileProtocol("file", (request, callback) => {
        const pathname = decodeURI(request.url.replace("file:///", ""));
        callback(pathname);
    });

    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("minimize", (event, arg) => {
    event.sender.getOwnerBrowserWindow().minimize()
})

ipcMain.on("maximize", (event, arg) => {
    let browserWindow = event.sender.getOwnerBrowserWindow();
    browserWindow.setFullScreen(!browserWindow.isFullScreen());
})

ipcMain.on("close", (event, arg) => {
    event.sender.getOwnerBrowserWindow().close();
})