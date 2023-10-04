import Header from '@/components/Header'
import { ContentBox } from '@/components/MuiStyledComponents'
import SideBar from '@/components/SideBar'
import { theme } from '@/context/ThemeProvider'
import { Box } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardPage from './page'
type Props = {
  children: any
}

const DashBoardLayout = ({ children }: Props) => {
  const [open, setOpen] = useState(true)
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: theme.palette.mLightGray?.main,
        overflowY: 'auto',
        height: '100%',
      }}
      className='hideScroll'
    >
      <Header open={open} setOpen={setOpen} />
      <SideBar open={open} setOpen={setOpen} />
      <ContentBox position='absolute' open={open} theme={theme}>
        {children}
      </ContentBox>
    </Box>
  )
}

export default DashBoardLayout
