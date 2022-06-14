import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { InputAdornment } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { Grid } from '@material-ui/core'
import { get } from 'lodash'

import Input from 'src/components/Form/Input'
import InputPassword from 'src/components/Form/InputPassword'
import { EmailRules, PasswordLoginRules } from 'src/components/Form/validation'
import Form from 'src/components/Form/form'
import withForm from 'src/components/Form/withForm'
import { Link } from 'src/components/Link'
import { useSubmitDisable } from 'src/components/Form/hooks'
import { commonContents } from 'src/contents/common'
import { loginContents } from 'src/contents/screens/login'
import { AuthLogin } from 'src/types/accounts'
import { updateLogin } from 'src/api/account'
import { showSnackBar, SnackbarType } from 'src/components/SnackbarCustom'
import { getErrorMessage, getSuccessMessage } from 'src/lib/http'
import { updateAuthToken } from 'src/lib/storage'
import { InputContainer, LoginButton, TitleWrapper, Title, Underline, Wrapper, FooterWrap } from './index.styled'
import { ROUTE_PATH } from 'src/types/route'
import { BSportalUrl } from 'src/constants/url'

function LoginForm() {
  const queryClient = useQueryClient()
  const isDisabled = useSubmitDisable()
  const loginMutation = useMutation(updateLogin)
  const navigate = useNavigate()

  const handleSubmit = async (data: AuthLogin) => {
    await loginMutation.mutateAsync(data, {
      onError: (error: unknown) => {
        showSnackBar(queryClient, {
          message: getErrorMessage(error),
          type: SnackbarType.ERROR,
        })
        navigate(ROUTE_PATH.organization)
      },

      onSuccess: (response: any) => {
        updateAuthToken(get(response, 'data.data.token'))
        showSnackBar(queryClient, {
          message: getSuccessMessage(response),
          type: SnackbarType.SUCCESS,
        })
        navigate(ROUTE_PATH.organization)
      },
    })
  }

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{commonContents.signIn}</Title>
        <Underline />
      </TitleWrapper>
      <Form onFormSubmit={handleSubmit}>
        <InputContainer>
          <Input
            name='email'
            rules={EmailRules}
            className='emailInput'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <MailOutlineIcon className='mailIcon' />
                </InputAdornment>
              ),
            }}
            placeholder={commonContents.emailId}
            fullWidth
          />
        </InputContainer>
        <InputContainer>
          <InputPassword
            name='password'
            rules={PasswordLoginRules}
            placeholder={commonContents.password}
            className='passwordInput'
            fullWidth
          />
        </InputContainer>
        <Grid container justify='flex-end'>
          <Link to={BSportalUrl.resetPassword} underline='none'>
            {loginContents.forgotPassword}
          </Link>
        </Grid>
        <LoginButton type='submit' color='primary' disabled={isDisabled || loginMutation.isLoading} fullWidth>
          {commonContents.login}
        </LoginButton>
      </Form>
      <FooterWrap>
        {loginContents.createAccount} &nbsp;
        <Link to={BSportalUrl.register} className='registerLink' underline='none'>
          {commonContents.signUp}
        </Link>
      </FooterWrap>
    </Wrapper>
  )
}

export default withForm(LoginForm)
