import RouteWrapper from '@/middleware/routeWrapper'
import { Route } from 'react-router-dom'
import PackagePage from './container/page'

type Props = {}

const PackageRoutes = (props: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<PackagePage />} />
    </RouteWrapper>
  )
}

export default PackageRoutes
