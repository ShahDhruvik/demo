import { Outlet, Route } from 'react-router-dom'
import Dashboard from './container/dashboardLayout'
import RouteWrapper from '../../middleware/routeWrapper'
import withAuth from '../../middleware/auth.middleware'
import Profile from './container/profile'
import { DASHBOARD_PATH } from '@/paths/index'
import DashBoardLayout from './container/dashboardLayout'
import DashPage from './container/page'

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
        <Route index element={<DashPage />} />
        {/* <Route path={DASHBOARD_PATH.PROFILE} element={<Profile />} /> */}
      </Route>
    </RouteWrapper>
  )
}

export default withAuth(DashboardRoute)
