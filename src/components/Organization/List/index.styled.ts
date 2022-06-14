import styled from '@emotion/styled'
import { Paper as MUIPaper, Button as MUIButton, Typography } from '@mui/material'

export const Paper = styled(MUIPaper)`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  width: 100%;
  margin-top: 12px;
`

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
`
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 6;
  padding-left: 20px;
`
export const Title = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden !important;
`
export const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`
export const Button = styled(MUIButton)`
  display: flex;
  justify-content: flex-end;
  border-radius: 50%;
  min-width: fit-content;
`
