import React from 'react'
import { Outlet, Route } from 'react-router-dom'
import RouteWrapper from '@/middleware/routeWrapper'
import FaqPage from './page'

interface Props {}

const FaqRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<FaqPage />} />
    </RouteWrapper>
  )
}

export default FaqRoute
