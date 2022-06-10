import React from 'react'
import { Toolbar, Typography, AppBar as MUIAppBar } from '@mui/material'
import ElevationScroll from './ElevationScroll'
import useRouteName from 'src/hooks/useRouteName'

function AppBar() {
  const name = useRouteName()

  return (
    <ElevationScroll>
      <MUIAppBar>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant='h6' fontSize='1.5rem'>
            {name}
          </Typography>
        </Toolbar>
      </MUIAppBar>
    </ElevationScroll>
  )
}

export default AppBar
