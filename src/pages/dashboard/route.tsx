import { Outlet, Route } from 'react-router-dom'
import RouteWrapper from '../../middleware/routeWrapper'
import { DASHBOARD_PATH, MASTER_PATH } from '@/paths/index'
import DashBoardLayout from './container/dashboardLayout'
import DashPage from './container/page'
import CountryPage from './country/page'
import AboutRoute from './about/route'

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
      </Route>
    </RouteWrapper>
  )
}

export default DashboardRoute
