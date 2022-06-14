import React from 'react'
import { Link as MUILink, LinkProps as LinkBaseType } from '@mui/material'
// @ts-ignore: Unreachable code error
const { remote } = window

const BS_PORTAL = process.env.REACT_APP_BUSTLE_SPOT_PORTAL
export interface LinkProps extends LinkBaseType {
  to?: string
}

export const Link = (props: LinkProps) => {
  const { to = '' } = props
  return <MUILink onClick={() => remote.shell.openExternal(`${BS_PORTAL + to}`)} {...props} />
}
