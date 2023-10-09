import { theme } from '@/context/ThemeProvider'
import { SidebarNames } from '@/types/common'
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
  const [selected, setSelected] = useState<SidebarNames>(undefined)
  const [subSelected, setSubSelected] = useState<string | undefined>(undefined)
  const [openSub, setOpenSub] = useState<{ isSubOpen: boolean; mainName: SidebarNames }>({
    isSubOpen: false,
    mainName: undefined,
  })

  //Selection from path
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
      setSubSelected(undefined)
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
            setSubSelected(nextItemMatch.txt)
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
                bgcolor: x.mainListName === selected ? '#434655' : theme.palette.mLightGray?.main,
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
                    if (x.isSingle) {
                      setSelected(x.mainListName)
                      nav(x.mainPath)
                    } else {
                      setSelected(x.mainListName)
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
                              sub.txt === subSelected ? theme.palette.mLightGray?.main : '',
                            boxShadow: sub.txt === subSelected ? box_Shadow_out : '',
                            borderRadius: sub.txt === subSelected ? '7px' : '',
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
                                nav(sub.path)
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
                                      sub.txt === subSelected
                                        ? theme.palette?.mBlack?.main
                                        : theme.palette.mWhite?.main,
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={sub.txt}
                                sx={{
                                  color:
                                    sub.txt === subSelected
                                      ? theme.palette.mBlack?.main
                                      : theme.palette?.mWhite?.main,
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
