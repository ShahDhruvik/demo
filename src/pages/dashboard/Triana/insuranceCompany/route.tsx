import React from 'react'
import { Route } from 'react-router-dom'
import RouteWrapper from '@/middleware/routeWrapper'
import InsuranceCompanyPage from './page'

interface Props {}

const InsuranceCompanyRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<InsuranceCompanyPage />} />
    </RouteWrapper>
  )
}

export default InsuranceCompanyRoute
