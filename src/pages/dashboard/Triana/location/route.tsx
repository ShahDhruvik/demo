import RouteWrapper from '@/middleware/routeWrapper'
import { LOCATION_PATH } from '@/paths/index'
import { Route } from 'react-router-dom'
import RedirectToPrevious from '@/components/RedirectToPrevious'
import CountryPage from './country/page'
import StatePage from './state/page'
import CityPage from './city/page'
import PincodePage from './pincode/page'

type Props = {}

const LocationRoutes = (props: Props) => {
  return (
    <RouteWrapper>
      <Route index element={<RedirectToPrevious />} />
      <Route path={LOCATION_PATH.COUNTRY} element={<CountryPage />} />
      <Route path={LOCATION_PATH.STATE} element={<StatePage />} />
      <Route path={LOCATION_PATH.CITY} element={<CityPage />} />
      <Route path={LOCATION_PATH.PINCODE} element={<PincodePage />} />
    </RouteWrapper>
  )
}

export default LocationRoutes
