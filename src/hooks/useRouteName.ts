import React, { useMemo } from 'react'
import { useLocation } from 'react-router'
import { PRIVATE_ROUTES, PUBLIC_ROUTES, RouterConfig } from 'src/routes/routes'

function useRouteName(): string {
  const location = useLocation()
  const name = useMemo(() => {
    const matchName = (route: RouterConfig) => {
      return route.path === location.pathname
    }
    const matchedRoute: RouterConfig =
      PRIVATE_ROUTES.find(matchName) || PUBLIC_ROUTES.find(matchName) || PUBLIC_ROUTES[0]
    return matchedRoute.name
  }, [location])

  return name
}

export default useRouteName
