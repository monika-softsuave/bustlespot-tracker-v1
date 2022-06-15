import { useMemo } from 'react'
import { matchRoutes, useLocation } from 'react-router'

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from 'src/routes/routes'

function useRouteName() {
  const location = useLocation()

  const name = useMemo(() => {
    const match = matchRoutes([...PRIVATE_ROUTES, ...PUBLIC_ROUTES], location)

    return match[0].route.name || 'Menu'
  }, [location])

  return name
}

export default useRouteName
