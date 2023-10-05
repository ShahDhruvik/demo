import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CustomSideBar } from './MuiStyledComponents'
import { theme } from '@/context/ThemeProvider'
import FetchSvg from './fetchSvg'
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import { SideBarItemsType } from '@/types/common'
import logo from '@/assets/images/logo.webp'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
// SideBarItemsType[]

const SideBar = ({ open, setOpen }: Props) => {
  useEffect(() => {
    const handleViewportChange = () => {
      if (window.innerWidth >= 1024) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    }
    window.addEventListener('resize', handleViewportChange)
    handleViewportChange()
    return () => {
      window.removeEventListener('resize', handleViewportChange)
    }
  }, [])
  const enum SIDEBAR_NAMES {
    HOME = 'Home',
    ABOUT = 'About',
  }
  const sidebarItems = [
    {
      id: 0,
      mainListName: SIDEBAR_NAMES.HOME,
      mainImage: 'home',
      subList: [
        { id: 0, iconName: 'ser', txt: 'Dashboard' },
        { id: 1, iconName: 'ser', txt: 'Home' },
        { id: 2, iconName: 'ser', txt: 'About' },
        { id: 3, iconName: 'ser', txt: 'Services' },
      ],
      isSingle: false,
    },
    {
      id: 1,
      mainListName: SIDEBAR_NAMES.ABOUT,
      mainImage: 'about',
      subList: [
        { id: 0, iconName: 'ser', txt: 'Dashboard' },
        { id: 1, iconName: 'ser', txt: 'Home' },
      ],
      isSingle: false,
    },
  ]
  const [openSub, setOpenSub] = useState({ isSubOpen: false, mainName: '' })
  const handleClick = (name: string) => {
    if (name === openSub.mainName) {
      setOpenSub({ isSubOpen: !openSub.isSubOpen, mainName: name })
    } else {
      setOpenSub({ isSubOpen: true, mainName: name })
    }
  }
  return (
    <CustomSideBar
      variant='permanent'
      open={open}
      theme={theme}
      sx={{
        minHeight: '100vh',
      }}
    >
      <div className='min-h-screen flex flex-col '>
        <div className='flex justify-between items-center  min-h-[64px] pr-3 mb-3 '>
          <div className='flex items-center '>
            <img src={logo} alt='' className='w-14 aspect-square' />
            <h1 className='text-2xl font-semibold text-darkBlue-main'>Oppchar</h1>
          </div>
          <button onClick={() => setOpen(false)} className='-mr-2'>
            <FetchSvg iconName='back' svgProp={{ width: 30, height: 30 }} />
          </button>
        </div>
        {/* <Divider sx={{ mx: 1, my: 1, border: `1px solid ${theme.palette.mGray?.main}` }} /> */}
        <div className='flex-1 px-3'>
          {sidebarItems.map((x, i) => {
            return (
              <List
                disablePadding
                sx={{
                  bgcolor: theme.palette.mLightGray?.main,
                  borderBottomLeftRadius: i === sidebarItems.length - 1 ? '10px' : '0px',
                  borderBottomRightRadius: i === sidebarItems.length - 1 ? '10px' : '0px',
                  borderTopLeftRadius: i === 0 ? '10px' : '0px',
                  borderTopRightRadius: i === 0 ? '10px' : '0px',
                }}
                key={x.id}
              >
                <ListItem disablePadding divider={i === sidebarItems.length - 1 ? false : true}>
                  <ListItemButton
                    onClick={() => handleClick(x.mainListName)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 2,
                      ':hover': {
                        borderBottomLeftRadius: i === sidebarItems.length - 1 ? '10px' : '0px',
                        borderBottomRightRadius: i === sidebarItems.length - 1 ? '10px' : '0px',
                        borderTopLeftRadius: i === 0 ? '10px' : '0px',
                        borderTopRightRadius: i === 0 ? '10px' : '0px',
                      },
                      paddingBottom: '4px',
                      paddingTop: '4px',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 20,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <FetchSvg
                        iconName={x.mainImage}
                        svgProp={{
                          width: 20,
                          height: 20,
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={x.mainListName} />
                    {!x.isSingle && (
                      <FetchSvg
                        iconName='right-arrow'
                        svgProp={{
                          width: 17,
                          height: 17,
                          className: `${
                            openSub.isSubOpen && openSub.mainName === x.mainListName
                              ? 'rotate-90'
                              : 'rotate-0'
                          } transition-all duration-500 ease-in-out`,
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
                {!x.isSingle && (
                  <Collapse
                    in={openSub.isSubOpen && openSub.mainName === x.mainListName}
                    timeout='auto'
                    translate='yes'
                    className='bg-darkBlue-main'
                  >
                    {x.subList.map((sub) => {
                      return (
                        <List disablePadding key={sub.id}>
                          <ListItem disablePadding divider>
                            <ListItemButton
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                                paddingBottom: '4px',
                                paddingTop: '4px',
                              }}
                              onClick={() => {}}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 20,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <FetchSvg
                                  iconName={sub.iconName}
                                  svgProp={{ width: 20, height: 20, fill: '#ffffff' }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={sub.txt}
                                sx={{ color: theme.palette.mWhite?.main }}
                              />
                            </ListItemButton>
                          </ListItem>
                        </List>
                      )
                    })}
                  </Collapse>
                )}
              </List>
            )
          })}
        </div>
      </div>
    </CustomSideBar>
  )
}

export default SideBar
