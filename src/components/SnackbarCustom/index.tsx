import React from 'react'
import { QueryClient, useQuery, useQueryClient } from 'react-query'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

import { QueryKey } from 'src/constants/http'

export interface SnackbarConfiguration {
  type?: SnackbarType
  message?: string
  open: boolean
}

export enum SnackbarType {
  ERROR = 'error',
  SUCCESS = 'success',
}

export const showSnackBar = (queryClient: QueryClient, data: { message: string; type?: SnackbarType }) => {
  queryClient.setQueryData(QueryKey.SNACKBAR_CONFIGURATION, { ...data, open: true })
}

export const hideSnackBar = (queryClient: QueryClient, reason?: string) => {
  if (reason === 'clickaway') {
    return
  }
  const preData = queryClient.getQueryData<SnackbarConfiguration>(QueryKey.SNACKBAR_CONFIGURATION)
  queryClient.setQueryData(QueryKey.SNACKBAR_CONFIGURATION, { ...preData, open: false })
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const SnackbarCustom = () => {
  const queryClient = useQueryClient()
  const { data: queryConfiguration } = useQuery<SnackbarConfiguration>(QueryKey.SNACKBAR_CONFIGURATION, () => ({
    open: false,
  }))

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    hideSnackBar(queryClient, reason)
  }

  return (
    <Snackbar open={queryConfiguration?.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={queryConfiguration?.type} sx={{ width: '100%' }}>
        {queryConfiguration?.message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarCustom
