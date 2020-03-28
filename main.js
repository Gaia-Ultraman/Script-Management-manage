const { app, BrowserWindow } =require("electron");

function createWindow() {
    let win = new BrowserWindow({
        width: 1024,
        height: 768,
    })
    win.loadURL('http://localhost:8000/');
    // win.webContents.openDevTools()
    win.on('closed', function () {
        win = null
    })
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)
// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
 // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
 if (process.platform !== 'darwin') {
 app.quit()
 }
})
app.on('activate', function () {
 // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
 if (mainWindow === null) {
 createWindow()
 }
})