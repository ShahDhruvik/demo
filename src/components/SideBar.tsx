import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CustomSideBar } from './MuiStyledComponents'
import { theme } from '@/context/ThemeProvider'
import FetchSvg from './fetchSvg'
import logo from '@/assets/images/logo.png'

import SideBarList from './SideBarList'
import { Divider } from '@mui/material'
type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

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
            !open ? 'justify-center' : 'justify-between pl-2 pr-3   '
          } items-center  min-h-[64px] mb-3 `}
        >
          {!open && (
            <button onClick={() => setOpen(true)}>
              <FetchSvg
                iconName='menu2'
                svgProp={{
                  width: 20,
                  height: 20,
                }}
                wrapperStyle='shadow-box-in  rounded-[7px] p-2 '
              />
            </button>
          )}

          {open && (
            <div className='flex items-center gap-1 '>
              <img src={logo} alt='' className='w-10 aspect-square rounded-full bg-white-main' />
              <h1 className='text-2xl font-semibold text-darkBlue-main'>Oopchar</h1>
            </div>
          )}
          {open && (
            <button
              onClick={() => setOpen(false)}
              className=' bg-white-main shadow-box-in rounded-lg p-1   z-[2000px]'
            >
              <FetchSvg iconName='undo' svgProp={{ width: 20, height: 20 }} />
            </button>
          )}
        </div>
        <SideBarList open={open} setOpen={setOpen} />
      </div>
    </CustomSideBar>
  )
}

export default SideBar
