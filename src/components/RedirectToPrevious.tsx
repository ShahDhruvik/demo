import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const RedirectToPrevious = () => {
  const history = useNavigate()
  useEffect(() => {
    history(-1)
  }, [])
  return null
}
export default RedirectToPrevious
