import RouteWrapper from '@/middleware/routeWrapper'
import { Route } from 'react-router-dom'
import PackagePage from './packages/page'
import RedirectToPrevious from '@/components/RedirectToPrevious'
import { TRIANA_PATH } from '@/paths/index'
import TreatmentPage from './treatment/page'
import TNCPage from './terms&conditions/page'
import CompliancePage from './compliance/page'

type Props = {}

const PackageRoutes = (props: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<RedirectToPrevious />} />
      <Route path={TRIANA_PATH.PACKAGE} element={<PackagePage />} />
      <Route path={TRIANA_PATH.PLAN} element={<TreatmentPage />} />
      <Route path={TRIANA_PATH.TNC} element={<TNCPage />} />
      <Route path={TRIANA_PATH.COMPLIANCE} element={<CompliancePage />} />
    </RouteWrapper>
  )
}

export default PackageRoutes
