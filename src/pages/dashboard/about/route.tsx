import { Outlet, Route } from 'react-router-dom'
import { ABOUT_PATH, COMMON_PATH, DASHBOARD_PATH, MASTER_PATH } from '@/paths/index'
import RouteWrapper from '@/middleware/routeWrapper'
import DashPage from '../container/page'
import StatePage from '../country/page'
import Contact from './contact/page'

interface Props {}

const AboutRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<DashPage />} />
      <Route path={ABOUT_PATH.CONTACT} element={<Contact />} />
    </RouteWrapper>
  )
}

export default AboutRoute
