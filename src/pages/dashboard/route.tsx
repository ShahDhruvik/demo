import { Outlet, Route } from 'react-router-dom'
import RouteWrapper from '../../middleware/routeWrapper'
import { DASHBOARD_PATH } from '@/paths/index'
import DashBoardLayout from './container/dashboardLayout'
import DashPage from './container/page'
import LocationRoutes from './location/route'
import PackageRoutes from './Triana/route'
import FaqRoute from './faq/route'
import BannerSliderRoute from './banner-Slider/route'
import QnaRoute from './question-Answer/route'
import DomainRoute from './domain/route'
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
        <Route path={DASHBOARD_PATH.TRIANA} element={<PackageRoutes />} />
        <Route path={DASHBOARD_PATH.FAQ} element={<FaqRoute />} />
        <Route path={DASHBOARD_PATH.BANNER_SLIDER} element={<BannerSliderRoute />} />
        <Route path={DASHBOARD_PATH.QUESTION_ANSWER} element={<QnaRoute />} />
        <Route path={DASHBOARD_PATH.DOMAIN} element={<DomainRoute />} />
      </Route>
    </RouteWrapper>
  )
}

export default DashboardRoute
