import { Outlet, Route } from 'react-router-dom'
import RouteWrapper from '../../middleware/routeWrapper'
import { DASHBOARD_PATH, MASTER_PATH } from '@/paths/index'
import DashBoardLayout from './container/dashboardLayout'
import DashPage from './container/page'
import CountryPage from './country/page'
import AboutRoute from './about/route'
import FaqRoute from './faq/route'
import React from 'react'
import BannerSliderRoute from './banner-Slider/route'
import QnaRoute from './question-Answer/route'
interface Props {}

const DashboardRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route
        element={
          <DashBoardLayout>
            <Outlet />
          </DashBoardLayout>
        }
      >
        <Route path={DASHBOARD_PATH.MASTER} element={<DashPage />} />
        <Route path={MASTER_PATH.COUNTRY} element={<CountryPage />} />
        <Route path={DASHBOARD_PATH.ABOUT} element={<AboutRoute />} />
        <Route path={DASHBOARD_PATH.FAQ} element={<FaqRoute />} />
        <Route path={DASHBOARD_PATH.BANNER_SLIDER} element={<BannerSliderRoute />} />
        <Route path={DASHBOARD_PATH.QUESTION_ANSWER} element={<QnaRoute />} />
      </Route>
    </RouteWrapper>
  )
}

export default DashboardRoute
