// All the common types are defined here
import { SetStateAction, Dispatch } from 'react'
import {
  ACTIONS_TABLE,
  ALIGN_DIALOG,
  DASHBOARDTYPE,
  HEADERBTNS,
  SIDEBAR_NAMES,
  TABLE_STATES,
} from '../utils/constants'
import { Theme } from '@mui/material'
import { ToastOptions } from 'react-toastify'
// Other types regarding the individual entity will have separate file (ex: user.types.ts)
export type PaletteColor = {
  light?: string
  main: string
  dark?: string
  contrastText?: string
}
export type HeaderProps = {
  theme: Theme
  open: boolean
}

export type AuthState = {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}
export type SideBarItemsType = {
  id: number
  listMembers: { id: number; iconName: string; txt: string }[]
  divideNotRequired?: boolean
}

export type AuthParams = {
  isAuth: boolean
  role: string
}

export type CacheType = {
  cacheData: Record<string, any>
  cacheExpDate: Record<string, string | undefined>
}

export type HeaderLinkType = {
  id: number
  name: string
  path: string
}

export type AlignDialogProp =
  | ALIGN_DIALOG.BOTTOM_LEFT
  | ALIGN_DIALOG.BOTTOM_RIGHT
  | ALIGN_DIALOG.TOP_LEFT
  | ALIGN_DIALOG.TOP_RIGHT

export type LoadingState = {
  loading: { isLoading: boolean; isPage: boolean; pageProps?: { image: any; pageTxt: string } }
  setLoading: Dispatch<
    SetStateAction<{
      isLoading: boolean
      isPage: boolean
      pageProps?: { image: any; pageTxt: string }
    }>
  >
}

export type SelectDDL = { label: string; _id: string }

export type HeadCell = {
  id: any
  label: string
  isSort: boolean
  isDate?: boolean
  isToolTip?: boolean
  type?:
    | 'image'
    | 'date'
    | 'linkTxt'
    | 'linkNumber'
    | 'chechBox'
    | 'InformedStatus'
    | 'Warranty'
    | 'checkBoxDate'
    | 'linkTxtView'
    | 'downlaodLink'
    | 'actions'
    | 'isFinal'
  lengthOftext?: number
  imageSrc?: string
  linkPath?: any
  secondLineLabel?: string
  etx?: string
  isDark?: boolean
  onView?: { isView: boolean; viewFnc: (item: any) => void }
  width?: number
}
export type HeaderBtnTypes = Array<
  { btnType: HEADERBTNS.CREATE; btnText?: string } | { btnType: HEADERBTNS.VIEW; btnText?: string }
>

export type Controls = {
  currentPage: number
  pages: number
  total: number
  from: number
  to: number
  trashCount: number
}

export type HandleControls = {
  search: string
  currentPage: number
  limitPerPage: number
  sort: string
  sortOrder: string
}

export type Actions = Array<AllowedAction>
export type GoToFields = {
  page: number
}

export type NotFoundContextType = string
export type NotFoundState = {
  notFound: NotFoundContextType[]
  setNotFound: Dispatch<SetStateAction<NotFoundContextType[]>>
}

export type TableStates =
  | TABLE_STATES.MAP
  | TABLE_STATES.DASHBOARDEDIT
  | TABLE_STATES.VIEW
  | TABLE_STATES.ACTIVE
  | TABLE_STATES.ADD
  | TABLE_STATES.DELETE
  | TABLE_STATES.EDIT
  | TABLE_STATES.INACTIVE
  | undefined
export type AllowedAction =
  | ACTIONS_TABLE.DASHBOARDEDIT
  | ACTIONS_TABLE.ADD
  | ACTIONS_TABLE.DELETE
  | ACTIONS_TABLE.EDIT
  | ACTIONS_TABLE.SWITCH
  | ACTIONS_TABLE.MAP
  | ACTIONS_TABLE.VIEW
  | undefined
export type DashboardType =
  | DASHBOARDTYPE.ASSET
  | DASHBOARDTYPE.SCHEDULE
  | DASHBOARDTYPE.PENDING
  | DASHBOARDTYPE.OVERDUE
  | DASHBOARDTYPE.EXECUTE
  | undefined
export type SearchDDL = { label: string; _id: string }
export type SearchBooleanDDL = { label: string | boolean; _id: string }

export type SidebarNames =
  | SIDEBAR_NAMES.MASTER
  | SIDEBAR_NAMES.ABOUT
  | SIDEBAR_NAMES.PROFILE
  | undefined

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ShowToastFunction = (type: ToastType, message: string, options?: ToastOptions) => void
