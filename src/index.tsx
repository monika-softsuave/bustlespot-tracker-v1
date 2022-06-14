// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'

import App from './App'
import * as serviceWorker from './serviceWorker'
import theme from './lib/theme'
import { queryClient } from './lib/queryClient'
import Frame from './components/Frame'
import SnackbarCustom from './components/SnackbarCustom'

const rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <Frame getTimerStatus={false} />
          <SnackbarCustom />
          <App />
        </StyledEngineProvider>
      </ThemeProvider>
    </QueryClientProvider>,
    rootElement,
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
