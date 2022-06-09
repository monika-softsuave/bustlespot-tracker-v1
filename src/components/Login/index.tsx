import React from 'react'

import loginBackground from 'src/assets/images/loginBackground.png'
import Footer from './Footer'
import Header from './Header'
import LoginForm from './LoginForm'
import { Wrapper } from './index.stryled'

export function Login() {
  return (
    <Wrapper style={{ backgroundImage: `url(${loginBackground})` }}>
      <Header />
      <LoginForm />
      <Footer />
    </Wrapper>
  )
}
