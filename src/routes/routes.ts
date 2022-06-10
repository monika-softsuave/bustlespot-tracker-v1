import Login from 'src/screens/login'
import Organization from 'src/screens/organization'
import { ROUTE_PATH } from 'src/types/route'

export interface RouterConfig {
  path: ROUTE_PATH
  Component: React.FC
  name: string
}

export const PUBLIC_ROUTES: RouterConfig[] = [
  {
    path: ROUTE_PATH.login,
    Component: Login,
    name: 'Login',
  },
]

export const PRIVATE_ROUTES: RouterConfig[] = [
  {
    path: ROUTE_PATH.organization,
    Component: Organization,
    name: 'Organization',
  },
]
