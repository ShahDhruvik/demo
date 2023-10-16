import React from 'react'
import { Route } from 'react-router-dom'
import RouteWrapper from '@/middleware/routeWrapper'
import DomainPage from './page'

interface Props {}

const DomainRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<DomainPage />} />
    </RouteWrapper>
  )
}

export default DomainRoute
