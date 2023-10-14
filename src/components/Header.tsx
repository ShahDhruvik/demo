import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { CustomAppBar } from './MuiStyledComponents'
import { theme } from '@/context/ThemeProvider'
import FetchSvg from './fetchSvg'
import { Avatar, Badge, Button, Divider, IconButton } from '@mui/material'
import person from '@/assets/images/60111.jpg'
import { useLocation } from 'react-router-dom'
import Profile from '@/pages/dashboard/container/profile'
import { sidebarItems } from '@/utils/constants'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Header = ({ open, setOpen }: Props) => {
  const [openProfile, setOpenProfile] = useState(false)
  const [secSideBarItem, setSecSideBarItem] = useState<string | undefined>(undefined)
  const { pathname } = useLocation()
  const decideName = (path: string) => {
    //url segemnts
    const segments = path.split('/')
    //conditions
    if (segments.length === 2) {
      const lastSegment = segments[segments.length - 1]
      const item = sidebarItems.find((x) => {
        const segs = x.mainPath.split('/')
        const last = segs[segs.length - 1]
        return last === lastSegment
      })
      if (item) {
        setSecSideBarItem(item.mainListName)
      }
    } else if (segments.length === 3) {
      const lastSegment = segments[segments.length - 1]
      const lastSecondSegment = segments[segments.length - 2]
      const item = sidebarItems.find((x) => {
        const segs = x.mainPath.split('/')
        const last = segs[segs.length - 1]
        return last === lastSecondSegment
      })
      if (item) {
        const next = item.subList.find((x) => {
          const segs = x.path.split('/')
          const last = segs[segs.length - 1]
          return last === lastSegment
        })
        setSecSideBarItem(next.txt)
      }
    } else if (segments.length === 4) {
      const lastSegment = segments[segments.length - 1]
      const lastSecondSegment = segments[segments.length - 2]
      const lastThirdSegment = segments[segments.length - 3]
      const item = sidebarItems.find((x) => {
        const segs = x.mainPath.split('/')
        const last = segs[segs.length - 1]
        return last === lastThirdSegment
      })
      if (item) {
        const next = item.subList.find((x) => {
          const segs = x.path.split('/')
          const last = segs[segs.length - 1]
          return last === lastSecondSegment
        })

        if (next) {
          const nextChild = next.childList.find((x) => {
            const segs = x.path.split('/')
            const last = segs[segs.length - 1]
            return last === lastSegment
          })
          setSecSideBarItem(nextChild.txt)
        }
      }
    } else {
    }
  }
  useEffect(() => {
    decideName(pathname)
  }, [pathname])
  return (
    <>
      <CustomAppBar open={open} theme={theme}>
        <div className='px-5 min-h-[64px] flex items-center'>
          <div className='flex-1 flex items-center min-h-[64px]  gap-2'>
            <h1 className='text-2xl text-lightGray-main font-semibold drop-shadow-2xl'>
              {secSideBarItem ? secSideBarItem : 'loading...'}
            </h1>
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
