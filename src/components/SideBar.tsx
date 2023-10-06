import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CustomSideBar } from './MuiStyledComponents'
import { theme } from '@/context/ThemeProvider'
import FetchSvg from './fetchSvg'
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import logo from '@/assets/images/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { ABOUT_PATH, COMMON_PATH, DASHBOARD_PATH } from '../paths'
import { SidebarNames } from '@/types/common'
import { sidebarItems } from '@/utils/constants'
type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SideBar = ({ open, setOpen }: Props) => {
  //route states
  const nav = useNavigate()
  const { pathname } = useLocation()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const lastSecondSegment = segments[segments.length - 2]

  //states
  const [selected, setSelected] = useState<SidebarNames>(undefined)
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
  const decideName = (path: string) => {
    //url segemnts
    const segments = path.split('/')
    const lastSegment = segments[segments.length - 1]
    const lastSecondSegment = segments[segments.length - 2]
    // Name in Header
    const item = sidebarItems.find((x) => {
      const segs = x.mainPath.split('/')
      const lastSeg = segs[segs.length - 1]
      return lastSeg === lastSegment
    })
    if (item) {
      //Setting for main path
      setSelected(item.mainListName)
    } else {
      // Fetching next Item
      const nextItem = sidebarItems.find((x) => {
        const segs = x.mainPath.split('/')
        const lastSeg = segs[segs.length - 1]
        return lastSeg === lastSecondSegment
      })
      if (nextItem) {
        if (!nextItem.isSingle) {
          const subListItems = nextItem.subList
          const nextItemMatch = subListItems.find((x) => {
            const nextLastSegs = x.path.split('/')
            const nextLastSeg = nextLastSegs[nextLastSegs.length - 1]
            return nextLastSeg === lastSegment
          })
          if (nextItemMatch) {
            setSelected(nextItem.mainListName as any)
          } else {
            setSelected(undefined)
          }
        } else {
          setSelected(undefined)
        }
      } else {
        setSelected(undefined)
      }
    }
  }
  useEffect(() => {
    decideName(pathname)
  }, [pathname])
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
  const [openSub, setOpenSub] = useState<{ isSubOpen: boolean; mainName: SidebarNames }>({
    isSubOpen: false,
    mainName: undefined,
  })
  const handleClick = (name: SidebarNames) => {
    if (name === openSub.mainName) {
      if (open) {
        setOpenSub({ isSubOpen: !openSub.isSubOpen, mainName: name })
      } else {
        setOpenSub({ isSubOpen: true, mainName: name })
      }
    } else {
      setOpenSub({ isSubOpen: true, mainName: name })
    }
  }
  const box_Shadow_out =
    '0px 2px 4px rgba(0, 0, 0, 0.4), 0px 7px 13px -3px rgba(0, 0, 0, 0.3), inset 0px -3px 0px rgba(0, 0, 0, 0.2)'
  const box_Shadow_in = '#d4d4d4 100px -100px 136px -128px inset'
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
        <div
          className={`flex ${
            !open ? 'justify-center' : 'justify-between pl-2 pr-3  '
          } items-center  min-h-[64px]  mb-3 `}
        >
          {!open && (
            <button onClick={() => setOpen(true)}>
              <FetchSvg
                iconName='menu2'
                svgProp={{
                  width: 20,
                  height: 20,
                }}
                wrapperStyle='shadow-box-out rounded-[7px] p-2 '
              />
            </button>
          )}

          {open && (
            <div className='flex items-center gap-1 '>
              <img src={logo} alt='' className='w-10 aspect-square rounded-full bg-white-main' />
              <h1 className='text-2xl font-semibold text-darkBlue-main'>Oppchar</h1>
            </div>
          )}
          {open && (
            <button
              onClick={() => setOpen(false)}
              className='-mr-2 bg-lightGray-main shadow-box-out rounded-lg p-1'
            >
              <FetchSvg iconName='back' svgProp={{ width: 20, height: 20 }} />
            </button>
          )}
        </div>
        <div className='flex-1 flex flex-col gap-3 px-2 '>
          {open &&
            sidebarItems.map((x, i) => {
              return (
                <List
                  disablePadding
                  sx={{
                    bgcolor:
                      x.mainListName === selected
                        ? theme.palette.mDarkBlue?.main
                        : theme.palette.mLightGray?.main,
                    borderRadius: '7px',
                    boxShadow: x.mainListName === selected ? box_Shadow_in : box_Shadow_out,
                  }}
                  key={x.id}
                >
                  <ListItem disablePadding divider={i === sidebarItems.length - 1 ? false : true}>
                    <ListItemButton
                      onClick={() => {
                        handleClick(x.mainListName)
                      }}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2,
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
                    >
                      {x.subList.map((sub) => {
                        return (
                          <List
                            disablePadding
                            key={sub.id}
                            sx={{
                              backgroundColor: theme.palette.mLightGray?.main,
                            }}
                          >
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
                                onClick={() => {
                                  nav(sub.path)
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
                                    iconName={sub.iconName}
                                    svgProp={{ width: 20, height: 20 }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={sub.txt}
                                  sx={{ color: theme.palette.mBlack?.main }}
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
          <div className='flex flex-col gap-5 px-[5px]'>
            {!open &&
              sidebarItems.map((x, i) => {
                return (
                  <List
                    sx={{
                      bgcolor:
                        x.mainListName === selected
                          ? theme.palette.mDarkGray?.main
                          : theme.palette.mLightGray?.main,
                      borderRadius: '7px',
                      boxShadow: x.mainListName === selected ? box_Shadow_in : box_Shadow_out,
                    }}
                    key={x.id}
                    disablePadding
                  >
                    <ListItem
                      sx={{
                        padding: '0px 0px',
                      }}
                    >
                      <ListItemButton
                        onClick={() => {
                          setOpen(true)
                          handleClick(x.mainListName)
                        }}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 2,
                          paddingBottom: '10px',
                          paddingTop: '10px',
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
                              width: 17,
                              height: 17,
                            }}
                          />
                        </ListItemIcon>
                        {/* <ListItemText primary={x.mainListName} /> */}
                        {/* {!x.isSingle && (
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
                    )} */}
                      </ListItemButton>
                    </ListItem>
                    {/* {!x.isSingle && (
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
                )} */}
                  </List>
                )
              })}
          </div>
        </div>
      </div>
    </CustomSideBar>
  )
}

export default SideBar
