import { Outlet, Route } from 'react-router-dom'
import RouteWrapper from '../../middleware/routeWrapper'
import { DASHBOARD_PATH } from '@/paths/index'
import DashBoardLayout from './container/dashboardLayout'
import DashPage from './container/page'
import LocationRoutes from './location/route'
import PackageRoutes from './Triana/route'

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
        <Route path={DASHBOARD_PATH.LOCATION} element={<LocationRoutes />} />
        <Route path={DASHBOARD_PATH.TRIANA} element={<PackageRoutes />} />
      </Route>
    </RouteWrapper>
  )
}

export default DashboardRoute
