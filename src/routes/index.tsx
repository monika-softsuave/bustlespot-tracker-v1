import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from 'src/routes/routes'
import { ROUTE_PATH } from 'src/types/route'
import { isUserAuthorized } from 'src/lib/auth'
import AppBar from 'src/layouts/AppBar'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()

  if (!isUserAuthorized()) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return (
    <React.Fragment>
      <AppBar />
      {children}
    </React.Fragment>
  )
}

const CustomRoutes = () => {
  return (
    <Router>
      <Routes>
        {PUBLIC_ROUTES.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {PRIVATE_ROUTES.map(({ path, Component, name }) => (
          <Route
            key={path}
            path={path}
            element={
              <RequireAuth>
                <Component />
              </RequireAuth>
            }
          />
        ))}
        <Route path={'/'} element={<Navigate to={ROUTE_PATH.organization} replace />} />
      </Routes>
    </Router>
  )
}

export default CustomRoutes
