// @flow

import React from 'react'
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

import BustleLogo from 'src/assets/images/logoWhite.png'
import { ActionWrapper, IconButton, LogoWrapper, Title, Wrapper } from './index.styled'
import { isUserAuthorized } from 'src/lib/auth'

// @ts-ignore: Unreachable code error
const { remote, ipcRenderer, process } = window
let animationId: any
let mouseX: any
let mouseY: any
let checkMouseUpEvt = false

type Props = {
  getTimerStatus: Boolean
}

const Frame = ({ getTimerStatus }: Props) => {
  const isAuthenticated = isUserAuthorized()
  const ele = document.getElementsByClassName('customFrameParentDiv')
  const handleClose = () => {
    if (process.platform === 'darwin') {
      remote.getCurrentWindow().hide()
      return
    }

    if (getTimerStatus) {
      remote.getCurrentWindow().webContents.send('notification', 'window has been minimized')
      if (process.platform === 'win32') {
        remote.getCurrentWindow().setSkipTaskbar(true)
      }
      remote.getCurrentWindow().hide()
    } else {
      // When stopwatch is not running
      // Open pop up component
    }
  }

  const onMouseUp = () => {
    checkMouseUpEvt = false
    ipcRenderer.send('windowMoved')
    ele && ele.length && ele[0].removeEventListener('mouseup', onMouseUp)
    cancelAnimationFrame(animationId)
  }

  const moveWindow = () => {
    ipcRenderer.send('windowMoving', { mouseX, mouseY })
    animationId = requestAnimationFrame(moveWindow)
  }

  const handleOnLogOut = () => {
    // Open pop up component
  }

  return (
    <Wrapper>
      <LogoWrapper>
        {isAuthenticated && (
          <>
            <img src={BustleLogo} alt='logo' style={{ height: '25px', marginLeft: '10px' }} />
            <Title>BUSTLE SPOT</Title>
          </>
        )}
      </LogoWrapper>
      <ActionWrapper>
        {isAuthenticated && (
          <IconButton onClick={handleOnLogOut}>
            <PowerSettingsNewIcon style={{ fontSize: '1.8rem' }} />
          </IconButton>
        )}
        <IconButton onClick={() => remote.getCurrentWindow().minimize()}>
          <DoNotDisturbOnOutlinedIcon style={{ fontSize: '1.8rem' }} />
        </IconButton>
        <IconButton onClick={handleClose}>
          <CancelOutlinedIcon style={{ fontSize: '1.8rem' }} />
        </IconButton>
      </ActionWrapper>
    </Wrapper>
  )
}
export default Frame
