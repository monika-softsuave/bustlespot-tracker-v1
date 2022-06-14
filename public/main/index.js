/* eslint-disable  */

const { Menu, ipcMain } = require('electron')
const path = require('path')
const activeWin = require('active-win')
const PauseIcon = path.join(__dirname, '../PauseIcon.png')
const PlayIcon = path.join(__dirname, '../PlayIcon.png')
const OpenWindow = path.join(__dirname, '../OpenWindow.png')

// listener
ipcMain.on('MouseandKeyEvent', handleIohookEvent)
ipcMain.on('getActiveWinData', getActiveWindowData)

global.keyboardAndMouseEvent = {
  mouseCount: 0,
  mouseOnline: false,
  totalCount: 0,
  keyCount: 0,
  keyOnline: false,
  time: Date.now()
}
global.projectInfo = {
  orgId: 0,
  projectId: 0,
  taskId: 0,
  timeSheetId: 0,
  activityId: 0
}
global.activeWinData = { data: '' }


function setKeyboardAndMouseCount(action) {
  const obj = global.keyboardAndMouseEvent
  // Here we are counting key and mouse event at each sec
  if (action === 'mouse') {
    obj.mouseOnline = true
  }
  if (action === 'key') {
    obj.keyOnline = true
  }
  obj.time = Date.now()
}

async function getActiveWindowData() {
  // Here it will give active window data
  global.activeWinData.data = await activeWin()
}
// this func is for mouse hover thumbnail button in taskbar
function addThumberButton(mainWindow, action) {
  let toolTipStr, icon

  if (!action) {
    mainWindow.setThumbarButtons([
      {
        tooltip: 'Start',
        icon: OpenWindow,
        click() {
          mainWindow.show()
          mainWindow.focus()
        }
      }
    ])

    return
  }

  if (global.timer.active) {
    toolTipStr = 'Pause'
    icon = PauseIcon
  } else {
    toolTipStr = 'Resume'
    icon = PlayIcon
  }

  mainWindow.setThumbarButtons([
    {
      tooltip: toolTipStr,
      icon: icon,
      click() {
        mainWindow.webContents.send('HandleTimer')
      }
    }
  ])
}

function getTrayTemplate(mainWindow, action, quitCallBack) {
  let contextMenu = [
    {
      label: 'Open',
      click: function() {
        mainWindow.restore()
        if (process.platform === 'win32') mainWindow.setSkipTaskbar(false)
        mainWindow.show()
        mainWindow.focus()
      }
    },
    {
      type: 'separator'
    }
  ]

  if (action) {
    contextMenu.push({
      label: global.timer.active ? 'Pause' : 'Resume',
      click: function() {
        mainWindow.webContents.send('HandleTimer')
      }
    })
    contextMenu.push({
      type: 'separator'
    })
  }
  contextMenu.push({
    label: 'Quit',
    click: function() {
      handleBeforeAppGetQuit(mainWindow, quitCallBack)
    }
  })

  return Menu.buildFromTemplate(contextMenu)
}

function handleIohookEvent(event, msg) {
  if (msg === 'start') {
    // ioHook.start()
  } else {
    // ioHook.stop()
  }
}

function handleBeforeAppGetQuit(mainWindow, quitCallBack) {
  if (global.timer.active) {
    mainWindow.webContents.send('appBeforeQuit')
  } else {
    if (quitCallBack) quitCallBack()
  }
}

module.exports = {
  handleIohookEvent,
  getActiveWindowData,
  addThumberButton,
  getTrayTemplate
}
