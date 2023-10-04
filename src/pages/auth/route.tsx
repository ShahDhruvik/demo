import { Route } from 'react-router-dom'
import RouteWrapper from '../../middleware/routeWrapper'
import LogIn from './container/login'
import LogOut from './container/logout'
import { AUTH_PATH } from '../../paths'

interface Props {}

const AuthRoute = ({}: Props) => {
  return (
    <RouteWrapper>
      <Route path={AUTH_PATH.LOGIN} element={<LogIn />} />
      <Route path={AUTH_PATH.LOGOUT} element={<LogOut />} />
    </RouteWrapper>
  )
}

export default AuthRoute
