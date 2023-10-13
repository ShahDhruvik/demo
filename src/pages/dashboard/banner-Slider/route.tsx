import React from 'react'
import { Route } from 'react-router-dom'
import RouteWrapper from '@/middleware/routeWrapper'
import BannerSliderPage from './page'

interface Props {}

const BannerSliderRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<BannerSliderPage />} />
    </RouteWrapper>
  )
}

export default BannerSliderRoute
