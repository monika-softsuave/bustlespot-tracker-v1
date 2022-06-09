import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { InputAdornment } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { Grid } from '@material-ui/core'

import Input from 'src/components/Form/Input'
import InputPassword from 'src/components/Form/InputPassword'
import { EmailRules, PasswordLoginRules } from 'src/components/Form/validation'
import Form from 'src/components/Form/form'
import withForm from 'src/components/Form/withForm'
import { Link } from 'src/components/Link'
import { useSubmitDisable } from 'src/components/Form/hooks'
import { commonContents } from 'src/contents/common'
import { loginContents } from 'src/contents/screens/login'
import { AuthLogin } from 'src/types/auth'
import { updateLogin } from 'src/api/account'
import { showSnackBar, SnackbarType } from 'src/components/SnackbarCustom'
import { getErrorMessage, getSuccessMessage } from 'src/lib/http'
import { InputContainer, LoginButton, TitleWrapper, Title, Underline, Wrapper, FooterWrap } from './index.styled'

function LoginForm() {
  const queryClient = useQueryClient()
  const isDisabled = useSubmitDisable()
  const loginMutation = useMutation(updateLogin)

  const handleSubmit = async (data: AuthLogin) => {
    await loginMutation.mutateAsync(data, {
      onError: (error: unknown) => {
        showSnackBar(queryClient, {
          message: getErrorMessage(error),
          type: SnackbarType.ERROR,
        })
      },

      onSuccess: response => {
        showSnackBar(queryClient, {
          message: getSuccessMessage(response),
          type: SnackbarType.SUCCESS,
        })
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
          <Link to='forgot-password' underline='none'>
            {loginContents.forgotPassword}
          </Link>
        </Grid>
        <LoginButton type='submit' color='primary' disabled={isDisabled || loginMutation.isLoading} fullWidth>
          {commonContents.login}
        </LoginButton>
      </Form>
      <FooterWrap>
        {loginContents.createAccount} &nbsp;
        <Link to='sign-up' className='registerLink' underline='none'>
          {commonContents.register}
        </Link>
      </FooterWrap>
    </Wrapper>
  )
}

export default withForm(LoginForm)
