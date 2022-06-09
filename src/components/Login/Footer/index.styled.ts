import styled from '@emotion/styled'
import { Typography } from '@mui/material'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`
export const Message = styled(Typography)`
  font-size: 32px;
  color: #fff;
  margin: 16px;
  pointer-events: none;
`
