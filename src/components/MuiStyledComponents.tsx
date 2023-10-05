import { styled } from '@mui/material/styles'
import {
  Box,
  IconButton,
  InputBase,
  Select,
  SelectProps,
  TableSortLabel,
  Theme,
} from '@mui/material'
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
})<MuiAppBarProps & { open: boolean }>(({ theme, open }: HeaderProps) => ({
  top: '84px',
  marginLeft: 20,
  minHeight: '100vh',
  width: `100%`,
  maxWidth: `calc(100% - ${40}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginRight: 20,
    marginLeft: drawerWidth + 20,
    width: `calc(100% - ${drawerWidth + 40}px )`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  '.MuiTableSortLabel-icon': {
    display: 'none',
  },
}))

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: '1px solid',
  borderColor: theme.palette.mGray?.main,
  borderRadius: '8px',
  backgroundColor: 'white',
  marginLeft: 0,
  width: '100%',
}))

export const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  pointerEvents: 'all',
}))

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    // height: '36px',
    [theme.breakpoints.up('sm')]: {
      width: '246px',
    },
  },
}))
