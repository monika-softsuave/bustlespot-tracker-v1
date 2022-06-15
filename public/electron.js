/* eslint-disable  */

const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  screen: Scrn,
  Tray
} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const preloadScript = path.join(__dirname, './main/preload.js');

const disableShortCutDataArray = [
  // { shortcut: 'CommandOrControl+Shift+I', description: 'disable devs tool' },
  { shortcut: 'CommandOrControl+Shift+R', description: 'disable reload' },
  { shortcut: 'CommandOrControl+-', description: 'disable zoom-out' },
  { shortcut: 'CommandOrControl+Shift+Plus', description: 'disable zoom-in' },
  { shortcut: 'CommandOrControl+R', description: 'disable reload' }
]
const iconPath = path.join(__dirname, './Bustle.png')
const trayIconPath = path.join(__dirname, './Bustle18.png')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null
let trayIcon = null

// global variable
global.window = { closed: false }
global.timer = { active: false }

// imported main process code
const electronUtility = require('./main/index')

// listener
ipcMain.on('Timer', handleTimer)
ipcMain.on('quitApp', stopTheApp)
ipcMain.on('windowMoved', windowMoved)
ipcMain.on('windowMoving', windowMoving)

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.show()
      if (process.platform === 'darwin') app.dock.show()
    }
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Create mainWindow, load the rest of the app, etc...
  app.on('ready', createWindow)
}

app.on('browser-window-focus', () => {
  // Only disable shortcut on focus
  // When we are not in development phase, disable shortcuts
  if (!isDev) {
    disableShortCutDataArray.forEach((shortcutData) =>
      globalShortcut.register(shortcutData.shortcut, () => {
        return false
      })
    )
  }
})

app.on('browser-window-blur', () => {
  //  enable shortcut on blur
  // When we are not in development phase, enable shortcuts
  if (!isDev) {
    disableShortCutDataArray.forEach((shortcutData) =>
      globalShortcut.unregister(shortcutData.shortcut, () => {
        return false
      })
    )
  }
})

function createWindow() {
  const { height } = Scrn.getPrimaryDisplay().workAreaSize
  const fixedHeight = height > 750 ? 750 : height > 650 ? height : 650
  const zoom =  fixedHeight / 750

  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: fixedHeight,
    title: 'BUSTLE SPOT',
    icon: iconPath,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      devTools: isDev,
      nativeWindowOpen: true,
      zoomFactor: zoom,
      preload: preloadScript
    },
    width: fixedHeight - 290 < 430 ? 430 : fixedHeight - 290,
    maximizable: false,
    resizable: false,
    frame: false
  })

  // set name in notification
  app.setAppUserModelId('App.Bustle_Spot')
  app.allowRendererProcessReuse = true
  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:4000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  // Hiding Menu Bar
  mainWindow.setMenuBarVisibility(false)

  // create tray
  createTray()

  // waiting for load
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  // focus event for window border
  mainWindow.on('focus', () => {
    if (process.platform !== 'darwin')
      mainWindow.webContents.send('SetWindowBorder', 'focus')
  })

  // blur event for window border
  mainWindow.on('blur', () => {
    if (process.platform !== 'darwin')
      mainWindow.webContents.send('SetWindowBorder', 'blur')
  })

  // Listen key press event
  // Listen to all mouse events (click, pressed, released, moved, dragged,wheel)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is close.
  mainWindow.on('close', (event) => {
    if (!global.window.closed) {
      if (global.timer.active && process.platform === 'win32') {
        event.preventDefault()
        mainWindow.webContents.send('notification', 'window has been minimized')
        // setSkipTaskBar is used for thumber button issue
        if (process.platform === 'win32') mainWindow.setSkipTaskbar(true)
        mainWindow.hide()
        return
      }
    }
    mainWindow.webContents.eventNames().forEach((n) => {
      mainWindow.webContents.removeAllListeners(n)
    })
  })
}

function handleTimer(event, status) {
  if (process.platform === 'win32') {
    electronUtility.addThumberButton(mainWindow, status)
  }
  trayIcon.setContextMenu(
    electronUtility.getTrayTemplate(mainWindow, status, stopTheApp) || []
  )
}

function stopTheApp() {
  global.window.closed = true
  trayIcon.destroy()
  trayIcon = null
  if (process.platform === 'linux') {
    mainWindow.getAllWindows().forEach(window => window.close())
    BrowserWindow.getAllWindows().forEach(window => window.close())
  }
  mainWindow.close()
}

function createTray() {
  trayIcon = new Tray(trayIconPath)

  trayIcon.setContextMenu(
    electronUtility.getTrayTemplate(mainWindow, false, stopTheApp)
  )
  trayIcon.setToolTip('Bustle Spot')

  trayIcon.on('click', () => {
    // show the app
    mainWindow.restore()
    mainWindow.setSkipTaskbar(false)
    mainWindow.show()
  })
}

// window moving based on cursor position
function windowMoving(ev, { mouseX, mouseY }) {
  const { x, y } = Scrn.getCursorScreenPoint()

  mainWindow.setPosition(x - mouseX, y - mouseY)
}

// window is moved
function windowMoved() { }

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  } else {
    mainWindow.show()
    mainWindow.focus()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
