import styled from '@emotion/styled'
import { Button, Divider, Typography } from '@mui/material'

export const Wrapper = styled.div`
  width: 76%;
  border-radius: 20px;
  padding: 24px;
  background-color: #fff;
`
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 16px;
`
export const Title = styled(Typography)`
  font-size: 22px;
  font-weight: 600;
`

export const Underline = styled(Divider)`
  height: 2px;
  width: 48px;
  background: #f23c4b;
`

export const Label = styled.label`
  color: #d3d3d3;
  font-size: 12px;
`
export const InputContainer = styled.div`
  width: 100%;

  .emailInput {
    margin-top: 4px;
    margin-bottom: 0px;

    .MuiSvgIcon-root {
      color: #8d8d8d;
    }
  }

  .passwordInput {
    margin-top: 4px;
    margin-bottom: 0px;

    .MuiSvgIcon-root {
      color: #8d8d8d;
    }
  }
`
export const LoginButton = styled(Button)`
  color: #fff;
  border: none;
  outline: none;
  font-size: 18px;
  border-radius: 40px !important;
  margin-top: 12px !important;
  text-transform: capitalize;
  padding: 4px 8px !important;
`

export const FooterWrap = styled.div`
  font-size: 12px;
  color: grey;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  .registerLink {
    font-size: 12px;
  }
`
