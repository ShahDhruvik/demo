import { Dispatch, SetStateAction, useState } from 'react'
import { CustomAppBar } from './MuiStyledComponents'
import { theme } from '@/context/ThemeProvider'
import FetchSvg from './fetchSvg'
import { Avatar, Badge, Button, Divider, IconButton } from '@mui/material'
import person from '@/assets/images/60111.jpg'
import { useNavigate } from 'react-router-dom'
import Profile from '@/pages/dashboard/container/profile'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Header = ({ open, setOpen }: Props) => {
  const nav = useNavigate()
  const [openProfile, setOpenProfile] = useState(false)
  return (
    <>
      {' '}
      <CustomAppBar open={open} theme={theme}>
        <div className='px-5 min-h-[64px] flex items-center'>
          <div className='flex-1 flex items-center min-h-[64px]  gap-2'>
            {!open && (
              <button onClick={() => setOpen(true)}>
                <FetchSvg
                  iconName='menu'
                  svgProp={{
                    width: 35,
                    height: 35,
                  }}
                />
              </button>
            )}
            <h1 className='text-2xl'>Dashboard</h1>
          </div>
          <IconButton onClick={() => {}}>
            <FetchSvg
              iconName='logout'
              svgProp={{
                width: 30,
                height: 30,
              }}
            />
          </IconButton>
          <Divider
            orientation='vertical'
            sx={{
              border: `1px solid ${theme.palette.mWhite?.main}`,
              minHeight: '30px',
              ml: '18px',
              mr: '10px',
            }}
          />
          <IconButton onClick={() => setOpenProfile(true)}>
            <Avatar sx={{ width: 30, height: 30 }} src={person} />
          </IconButton>
          <Divider
            orientation='vertical'
            sx={{
              border: `1px solid ${theme.palette.mWhite?.main}`,
              minHeight: '30px',
              ml: '18px',
              mr: '10px',
            }}
          />
          <IconButton onClick={() => {}}>
            <Badge
              badgeContent={4}
              color='primary'
              sx={{ '.MuiBadge-badge': { top: '3px', right: '2px' } }}
            >
              <FetchSvg
                iconName='notification'
                svgProp={{
                  width: 30,
                  height: 30,
                }}
              />
            </Badge>
          </IconButton>
        </div>
      </CustomAppBar>
      <Profile open={openProfile} handleClose={() => setOpenProfile(false)} />
    </>
  )
}

export default Header
