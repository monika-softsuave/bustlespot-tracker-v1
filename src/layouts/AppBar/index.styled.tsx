import styled from '@emotion/styled'
import { Button as MUIButton, Toolbar } from '@mui/material'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`
export const Button = styled(MUIButton)`
  display: flex;
  border-radius: 50%;
  min-width: fit-content;
  flex: 1;
  align-items: center;
  justify-content: center;
`
export const HeaderWrapper = styled.div`
  display: flex;
`
export const NameBar = styled(Toolbar)`
  width: 100%;
  padding-left: 0px;
  justify-content: center;
`
