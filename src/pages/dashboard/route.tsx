import { Outlet, Route } from 'react-router-dom'
import RouteWrapper from '../../middleware/routeWrapper'
import { DASHBOARD_PATH } from '@/paths/index'
import DashBoardLayout from './container/dashboardLayout'
import DashPage from './container/page'
import CountryPage from './location/country/page'
import AboutRoute from './about/route'
import LocationRoutes from './location/route'

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
        <Route path={DASHBOARD_PATH.ABOUT} element={<AboutRoute />} />
        <Route path={DASHBOARD_PATH.LOCATION} element={<LocationRoutes />} />
      </Route>
    </RouteWrapper>
  )
}

export default DashboardRoute
