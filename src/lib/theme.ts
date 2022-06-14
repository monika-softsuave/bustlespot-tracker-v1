import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#f23c4b',
      light: '#ff5d3b',
    },
    secondary: {
      main: '#ff007b',
    },
    error: {
      main: '#FF0000',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          margin: 0,
          fontFamily: 'Ubuntu, sans-serif !important',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        '#root': {
          height: '100%',
          // padding: 0,
        },
        'h1,h2,h3,p': {
          margin: 0,
        },
        code: {
          fontFamily: 'source-code-pro,Menlo,Monaco,Consolas,`Courier New`,monospace',
        },
        '#hubspot-messages-iframe-container': {
          zIndex: '9996 !important' as unknown as number,
        },
        '.rpv-core-page-layer': {
          margin: '0 auto 20px',
        },
        '&::-webkit-scrollbar': {
          width: '0.2em',
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#fff',
          outline: '1px solid slategrey',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Ubuntu, sans-serif !important',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
      styleOverrides: {
        root: {
          fontFamily: 'Ubuntu, sans-serif !important',
          '&.Mui-disabled': {
            color: '#fff',
            border: 'none',
            outline: 'none',
            backgroundColor: 'grey',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          flex: '0 0 auto',
          color: 'rgba(0, 0, 0, 0.54)',
          overflow: 'visible',
          fontSize: '1.5rem',
          textAlign: 'center',
          transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
        edgeEnd: {
          marginRight: '0px',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        color: '#337ab7',
      },
      styleOverrides: {
        root: {
          fontSize: '14px',
          cursor: 'pointer',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '14px',
          '&$focused:not($error)': {
            color: '#3E4545',
          },
          '&$error': {
            color: '#D0021B',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        color: 'primary',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: '1px solid #D6DADB',
          '&:hover': {
            borderColor: '#D0021B',
          },
          '&$focused $notchedOutline': {
            borderWidth: '1px',
            borderColor: '#3E4545',
          },
          '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
            borderWidth: '1px',
            borderColor: '#3E4545',
          },
          '&$error $notchedOutline': {
            borderColor: '#D0021B',
          },
          '&$disabled $notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.2)',
          },
          '&$disabled': {
            backgroundColor: '#F7F7F7',
            color: '#767676',
          },
          fontFamily: 'Ubuntu, sans-serif !important',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: 'sticky',
          background: '#fff',
          color: '#f23c4b',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: '4px',
          marginLeft: '0px',
          color: '#767676',
          fontSize: '11px',
          lineHeight: '16px',
          marginRight: 0,
          '&$error': {
            color: '#D0021B',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {},
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          left: 'unset',
          top: '50px',
          bottom: 'unset',
          right: '8px',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          fontSize: '1rem',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: '#D6DADB',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        colorSecondary: {
          '&$checked': {
            color: '#000',
          },
        },
      },
    },
  },
})

export default theme
