import { useNavigate } from 'react-router-dom'
import { AUTH_PATH, MAIN_PATH } from '../../../paths'
import { useAuth } from '../../../context/AuthContext'

interface Props {}

const LogOut = ({}: Props) => {
  const { clearStorage } = useAuth()
  const nav = useNavigate()
  return (
    <section className='bg-red-400'>
      <div className='flex justify-center items-center'>
        <button
          onClick={() => {
            clearStorage()
            nav(`${MAIN_PATH.AUTH.split('/*')[0]}${AUTH_PATH.LOGIN}`)
          }}
        >
          signOut
        </button>
      </div>
    </section>
  )
}

export default LogOut
