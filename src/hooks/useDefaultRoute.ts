import { useMemo } from 'react'
import { matchRoutes, useLocation, useNavigate } from 'react-router'

import { PRIVATE_ROUTES } from 'src/routes/routes'
import { ROUTE_PATH } from 'src/types/route'
function useDefaultRoute(): {navigateDefaultRoute: () => void, isDefaultRoute: boolean} {
  const location = useLocation()
  const navigate = useNavigate()

  const navigateDefaultRoute = () => {
    navigate(ROUTE_PATH.organization)
  }

  const isDefaultRoute = useMemo(() => {
    const match = matchRoutes([...PRIVATE_ROUTES], location)

    return match[0].route.name === 'Organization'
  }, [location])

  return {navigateDefaultRoute, isDefaultRoute}
}

export default useDefaultRoute
