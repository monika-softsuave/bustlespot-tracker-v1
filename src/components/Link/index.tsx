import React from 'react'
import { Link as MUILink, LinkProps as LinkBaseType } from '@mui/material'
import { URL } from 'src/constants/url'
// @ts-ignore: Unreachable code error
const { remote } = window

export interface LinkProps extends LinkBaseType {
  to?: string
}

export const Link = (props: LinkProps) => {
  const { to = '' } = props
  return <MUILink onClick={() => remote.shell.openExternal(`${URL.bustleSpotPortal + to}`)} {...props} />
}
