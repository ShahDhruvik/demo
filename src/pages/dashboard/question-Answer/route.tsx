import React from 'react'
import { Route } from 'react-router-dom'
import RouteWrapper from '@/middleware/routeWrapper'
import QnaPage from './page'

interface Props {}

const QnaRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<QnaPage />} />
    </RouteWrapper>
  )
}

export default QnaRoute
