import styled from '@emotion/styled'
import { IconButton as MUIIconButton, Typography } from '@mui/material'

export const Wrapper = styled.div`
  height: 34px;
  display: flex;
  cursor: grab;
  justify-content: space-between;
  align-items: center;
  -webkit-app-region: drag;
  background-color: #f23c4b;
`
export const Title = styled(Typography)`
  color: #fff;
  font-size: 14px;
  margin-left: 8px;
`
export const LogoWrapper = styled.div`
  height: inherit;
  display: flex;
  align-items: center;
`
export const ActionWrapper = styled.div`
  display: flex;
`
export const IconButton = styled(MUIIconButton)`
  background-color: #f23c4b;
  color: #fff;
  margin-right: 6px !important;
  transition: 0.3s !important;
  -webkit-app-region: no-drag;
  padding: 0px !important;
`
