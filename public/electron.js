const path = require("path");
const { app, BrowserWindow, protocol } = require("electron");
const isDev = require("electron-is-dev");
const fs = require("fs");
const { electron } = require("process");
const { ipcMain } = require('electron');
const { DatabaseManager } = require("../src/database/DatabaseManager");

let databaseManager = null;

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
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    protocol.registerFileProtocol("file", (request, callback) => {
        const pathname = decodeURI(request.url.replace("file:///", ""));
        callback(pathname);
    });

    // Connect to the database
    let pathToAppData = app.getPath("userData");
    pathToAppData = path.join(pathToAppData, "data", "data.sql");

    if (!fs.existsSync(pathToAppData)) {
        fs.mkdir(pathToAppData, (err) => {
            if (err) {
                console.error(err);
            }
        });
    };

    databaseManager = new DatabaseManager(pathToAppData);
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        databaseManager.closeDatabase();
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

// Listeners for the traffic lights
ipcMain.on("minimize", (event, arg) => {
    event.sender.getOwnerBrowserWindow().minimize()
})

ipcMain.on("maximize", (event, arg) => {
    let browserWindow = event.sender.getOwnerBrowserWindow();

    if (browserWindow.isMaximized()) {
        browserWindow.unmaximize();
    }
    else {
        browserWindow.maximize();
    }
})

ipcMain.on("close", (event, arg) => {
    databaseManager.closeDatabase();
    event.sender.getOwnerBrowserWindow().close();
})

//DB Stuff
ipcMain.on("get-images", (event, arg) => {
    databaseManager.getImages().then((result)=> {
        event.reply("get-images-reply", JSON.stringify(result));
    });
});

ipcMain.on("insert-images", (event, arg) => {
    databaseManager.insertImages(arg).then((result) => {
        event.reply("insert-images-reply", JSON.stringify(result));
    });
})