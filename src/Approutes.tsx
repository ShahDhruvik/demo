// This maintains the routes of the App.
// It will be separated as the routes are more complexed.
// This has an example for nested routing and some normal routes
import { Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import AuthRoute from './pages/auth/route'
import DashboardRoute from './pages/dashboard/route'
import UnAuthorized from './components/UnAuthorized'
import { COMMON_PATH, MAIN_PATH } from './paths'
import Loader from './components/Loader'
import { useLoading } from './context/LoadingContext'

type Props = {}

const AppRoutes = ({}: Props) => {
  const { loading } = useLoading()
  return (
    <>
      <Routes>
        <Route path={MAIN_PATH.AUTH} element={<AuthRoute />} />
        <Route path={MAIN_PATH.DASHBOARD} element={<DashboardRoute />} />
        <Route path={COMMON_PATH.NOTFOUND} element={<NotFound />} />
        <Route path={MAIN_PATH.UNAUTHORIZED} element={<UnAuthorized />} />
      </Routes>
      <Loader loading={loading} />
    </>
  )
}

export default AppRoutes
