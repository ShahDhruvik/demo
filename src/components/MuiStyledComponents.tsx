import { styled } from '@mui/material/styles'
import { Box, Select, SelectProps, Theme } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer'
import { HeaderProps } from '@/types/common'
import { drawerWidth } from '@/utils/constants'

export const MobileSelect = styled(Select)<SelectProps>(({}) => ({
  '.MuiSvgIcon-root': {
    visibility: 'hidden',
  },
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  paddingRight: 0,
}))

export const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MuiAppBarProps & { theme: Theme; open: boolean }>(({ theme, open }: HeaderProps) => ({
  backgroundColor: theme.palette.mDarkBlue?.main,
  maxWidth: '100%',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export const CustomSideBar = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MuiDrawerProps & { open: boolean; theme: Theme }>(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'fixed',
    overflowX: 'hidden',
    overflowY: 'scroll',
    whiteSpace: 'nowrap',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
    }),
  },
}))

export const ContentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MuiAppBarProps & { open: boolean; theme: Theme }>(({ theme, open }: HeaderProps) => ({
  top: 0,
  marginLeft: '20px',
  marginRight: '20px',
  marginTop: '84px',
  marginBottom: '20px',
  maxWidth: '100%',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth + 20,
    marginRight: '20px',
    marginTop: '84px',
    marginBottom: '20px',
    maxWidth: '100%',
    width: `calc(100% - ${drawerWidth + 40}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))
