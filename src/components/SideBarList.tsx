import { theme } from '@/context/ThemeProvider'
import { SidebarNames, SidebarSubListNames } from '@/types/common'
import { sidebarItems } from '@/utils/constants'
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useEffect, useState, SetStateAction, Dispatch } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FetchSvg from './fetchSvg'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SideBarList = ({ open, setOpen }: Props) => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  //states
  const [selected, setSelected] = useState<SidebarNames | SidebarSubListNames>(undefined)
  const [subSelected, setSubSelected] = useState<string | undefined>(undefined)
  const [childSelected, setChildSelected] = useState<string | undefined>(undefined)
  const [openSub, setOpenSub] = useState<{ isSubOpen: boolean; mainName: SidebarNames }>({
    isSubOpen: false,
    mainName: undefined,
  })
  const [openChild, setOpenChild] = useState<{
    isChildOpen: boolean
    mainName: SidebarSubListNames
  }>({
    isChildOpen: false,
    mainName: undefined,
  })

  //Selection from path
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
        setSelected(item.mainListName)
        setSubSelected(undefined)
        setChildSelected(undefined)
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
        setSelected(item.mainListName)
        const next = item.subList.find((x) => {
          const segs = x.path.split('/')
          const last = segs[segs.length - 1]
          return last === lastSegment
        })
        setSubSelected(next.txt)
        setChildSelected(undefined)
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
        setSelected(item.mainListName)
        const next = item.subList.find((x) => {
          const segs = x.path.split('/')
          const last = segs[segs.length - 1]
          return last === lastSecondSegment
        })

        if (next) {
          setSubSelected(next.txt)
          const nextChild = next.childList.find((x) => {
            const segs = x.path.split('/')
            const last = segs[segs.length - 1]
            return last === lastSegment
          })
          setChildSelected(nextChild.txt)
        }
      }
    } else {
    }
  }
  useEffect(() => {
    decideName(pathname)
  }, [pathname])

  //Click events
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
  const handleClickSub = (name: SidebarSubListNames) => {
    if (name === openChild.mainName) {
      if (open) {
        setOpenChild({ isChildOpen: !openChild.isChildOpen, mainName: name })
      } else {
        setOpenChild({ isChildOpen: true, mainName: name })
      }
    } else {
      setOpenChild({ isChildOpen: true, mainName: name })
    }
  }
  //Shadows
  const box_Shadow_out =
    '0px 2px 4px rgba(0, 0, 0, 0.4), 0px 7px 13px -3px rgba(0, 0, 0, 0.3), inset 0px -3px 0px rgba(0, 0, 0, 0.2)'
  const box_Shadow_in = '#d4d4d4 100px -100px 136px -128px inset'
  return (
    <div className='flex-1 flex flex-col gap-3 px-2 '>
      {open &&
        sidebarItems.map((x, i) => {
          return (
            <List
              disablePadding
              sx={{
                bgcolor:
                  x.mainListName === selected
                    ? theme.palette.mDarkestGray.main
                    : theme.palette.mLightGray?.main,
                borderRadius: '7px',
                boxShadow: x.mainListName === selected ? '' : box_Shadow_out,
                color: x.mainListName === selected ? theme.palette.mWhite?.main : '',
              }}
              key={x.id}
            >
              <ListItem disablePadding divider={i === sidebarItems.length - 1 ? false : true}>
                <ListItemButton
                  onClick={() => {
                    handleClick(x.mainListName)
                    setSelected(x.mainListName)
                    if (x.isSingle) {
                      nav(x.mainPath)
                    }
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
                        fill: x.mainListName === selected ? 'white' : '',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={x.mainListName} />
                  {!x.isSingle && (
                    <FetchSvg
                      iconName='right-arrow'
                      svgProp={{
                        width: 20,
                        height: 20,
                        fill: x.mainListName === selected ? theme.palette.mWhite?.main : '',
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
                  <div className='flex flex-col gap-1 rounded-xl overflow-hidden my-2 px-[5px]'>
                    {x.subList.map((sub) => {
                      return (
                        <List
                          disablePadding
                          key={sub.id}
                          sx={{
                            backgroundColor:
                              sub.txt === subSelected && sub.isSingle
                                ? theme.palette.mLightGray?.main
                                : '',
                            boxShadow:
                              sub.txt === subSelected && sub.isSingle ? box_Shadow_out : '',
                            borderRadius: sub.txt === subSelected && sub.isSingle ? '7px' : '',
                          }}
                        >
                          <ListItem disablePadding divider>
                            <ListItemButton
                              sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                px: '5px',
                                paddingBottom: '4px',
                                paddingTop: '4px',
                              }}
                              onClick={() => {
                                handleClickSub(sub.txt)
                                setSelected(x.mainListName)
                                setSubSelected(sub.txt)
                                if (sub.isSingle) {
                                  nav(sub.path)
                                }
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 10,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <FetchSvg
                                  iconName='right-arrow'
                                  svgProp={{
                                    width: 20,
                                    height: 20,
                                    fill:
                                      sub.txt === subSelected && sub.isSingle
                                        ? theme.palette?.mBlack?.main
                                        : theme.palette?.mWhite?.main,
                                    ...(!sub.isSingle && {
                                      className: `${
                                        openChild.isChildOpen && openChild.mainName === sub.txt
                                          ? 'rotate-90'
                                          : 'rotate-0'
                                      } transition-all duration-500 ease-in-out`,
                                    }),
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={sub.txt}
                                sx={{
                                  color:
                                    sub.txt === subSelected && sub.isSingle
                                      ? theme.palette.mBlack?.main
                                      : theme.palette?.mWhite?.main,
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                          {!sub.isSingle && (
                            <Collapse
                              in={openChild.isChildOpen && openChild.mainName === sub.txt}
                              timeout='auto'
                              translate='yes'
                            >
                              <div className='flex flex-col gap-1 rounded-xl overflow-hidden my-2 mx-2 px-[5px] bg-white-main py-2'>
                                {sub.childList.map((chl, ic) => {
                                  return (
                                    <List
                                      disablePadding
                                      key={chl.id}
                                      sx={{
                                        backgroundColor:
                                          chl.txt === childSelected
                                            ? theme.palette.mDarkestGray?.main
                                            : '',
                                        boxShadow: chl.txt === childSelected ? box_Shadow_out : '',
                                        borderRadius: chl.txt === childSelected ? '7px' : '',
                                      }}
                                    >
                                      <ListItem
                                        disablePadding
                                        divider={ic === sub.childList.length - 1 ? false : true}
                                      >
                                        <ListItemButton
                                          sx={{
                                            display: 'flex',
                                            justifyContent: 'start',
                                            alignItems: 'center',
                                            px: '5px',
                                            paddingBottom: '4px',
                                            paddingTop: '4px',
                                            gap: 0.5,
                                          }}
                                          onClick={() => {
                                            nav(chl.path)
                                          }}
                                        >
                                          <ListItemIcon
                                            sx={{
                                              minWidth: 10,
                                              display: 'flex',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                            }}
                                          >
                                            <FetchSvg
                                              iconName='right-arrow'
                                              svgProp={{
                                                width: 16,
                                                height: 16,
                                                fill:
                                                  chl.txt === childSelected
                                                    ? theme.palette?.mWhite?.main
                                                    : theme.palette?.mDarkestGray?.main,
                                              }}
                                            />
                                          </ListItemIcon>
                                          <ListItemText
                                            primary={chl.txt}
                                            sx={{
                                              color:
                                                chl.txt === childSelected
                                                  ? theme.palette?.mWhite?.main
                                                  : theme.palette.mBlack?.main,
                                            }}
                                          />
                                        </ListItemButton>
                                      </ListItem>
                                    </List>
                                  )
                                })}
                              </div>
                            </Collapse>
                          )}
                        </List>
                      )
                    })}
                  </div>
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
                  bgcolor: x.mainListName === selected ? '#434655' : theme.palette.mLightGray?.main,
                  borderRadius: '7px',
                  boxShadow: x.mainListName === selected ? '' : box_Shadow_out,
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
                      if (x.isSingle) {
                        nav(x.mainPath)
                        setSelected(x.mainListName)
                        setOpenSub({ isSubOpen: false, mainName: undefined })
                        setOpenChild({ isChildOpen: false, mainName: undefined })
                      } else {
                        setSelected(x.mainListName)
                        setOpen(true)
                        handleClick(x.mainListName)
                      }
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
                          fill: x.mainListName === selected ? theme.palette.mWhite?.main : '',
                        }}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </List>
            )
          })}
      </div>
    </div>
  )
}

export default SideBarList
