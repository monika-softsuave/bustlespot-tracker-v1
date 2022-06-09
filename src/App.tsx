/* @ts-ignore */
import React, { useEffect } from 'react'

import AppIcon from 'src/assets/images/logoRed.png'
import { AppWrapper, AppContainer } from './App.styled'
import Frame from './components/Frame'
import SnackbarCustom from './components/SnackbarCustom'
import Login from './screens/login'
// @ts-ignore: Unreachable code error
const { ipcRenderer, process } = window

const App = () => {
  
  useEffect(() => {
    ipcRenderer.on('notification', sendNotification)
    ipcRenderer.on('SetWindowBorder', setWindowBorderStyle)

    return () => {
      ipcRenderer.removeListener('notification', sendNotification)
      ipcRenderer.removeListener('SetWindowBorder', setWindowBorderStyle)
    }
  }, [])

  // @ts-ignore: Unreachable code error
  const sendNotification = (_, msg) => {
    const icon = process.platform === 'darwin' ? '' : AppIcon

    new Notification('BUSTLE SPOT', {
      body: msg,
      icon: icon,
    })
  }
  // @ts-ignore: Unreachable code error
  const setWindowBorderStyle = (_, type) => {
    const htmlStyle = document.getElementsByTagName('html')
    const classStyle = document.getElementsByClassName('App')

    if (htmlStyle.length) {
      if (type === 'blur' && htmlStyle.length && classStyle.length) {
        htmlStyle[0].style.border = '1px solid #1010106b'
        // @ts-ignore: Unreachable code error
        classStyle[0]?.style.setProperty('height', '100vh')
      }
      if (type === 'focus' && htmlStyle.length && classStyle.length) {
        htmlStyle[0].style.border = '1px solid #10101099'
        // @ts-ignore: Unreachable code error
        classStyle[0]?.style.setProperty('height', '100vh')
      }
    }
  }

  return (
    <AppContainer className='App'>
      <Frame isAuthenticated={false} getTimerStatus={false} />
      <SnackbarCustom />
      <AppWrapper>
        <Login />
      </AppWrapper>
    </AppContainer>
  )
}

export default App
