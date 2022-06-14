import React from 'react'
import { Toolbar, Typography, AppBar as MUIAppBar } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ElevationScroll from './ElevationScroll'
import useRouteName from 'src/hooks/useRouteName'
import { Button, HeaderWrapper, NameBar } from './index.styled'
import { useNavigate } from 'react-router'
import useDefaultRoute from 'src/hooks/useDefaultRoute'

function AppBar() {
  const name = useRouteName()
  const navigate = useNavigate()
  const { isDefaultRoute } = useDefaultRoute()

  return (
    <ElevationScroll>
      <MUIAppBar>
        <HeaderWrapper>
          {!isDefaultRoute && (
            <Toolbar sx={{ cursor: 'pointer' }}>
              <Button onClick={() => navigate(-1)} variant='text'>
                <ChevronLeftIcon />
              </Button>
            </Toolbar>
          )}
          <NameBar sx={{ paddingRight: isDefaultRoute ? '0px' : '80px' }}>
            <Typography variant='h6' fontSize='1.5rem'>
              {name}
            </Typography>
          </NameBar>
        </HeaderWrapper>
      </MUIAppBar>
    </ElevationScroll>
  )
}

export default AppBar
