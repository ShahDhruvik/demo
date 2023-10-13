// All the common types are defined here
import { ToastOptions } from 'react-toastify'
import { SetStateAction, Dispatch } from 'react'
import {
    ACTIONS_TABLE,
    ALIGN_DIALOG,
    DASHBOARDTYPE,
    HEADERBTNS,
    INFOBOXES,
    SIDEBAR_NAMES,
    SIDEBAR_SUBLIST_NAMES,
    TABLE_STATES,
} from '../utils/constants'
import { Theme } from '@mui/material'
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
    lengthOftext?: number
    imageSrc?: string
    linkPath?: any
    secondLineLabel?: string
    etx?: string
    isDark?: boolean
    onView?: { isView: boolean; viewFnc: (item: any) => void }
    width?: number
    trueTxt?: string
    falseTxt?: string
}
export type HeaderBtnTypes = Array<{ btnType: HEADERBTNS.CREATE; btnText?: string }>

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
    | SIDEBAR_NAMES.LOCATION
    | SIDEBAR_NAMES.TRIANA
    | undefined

export type SidebarSubListNames =
    | SIDEBAR_SUBLIST_NAMES.CITY
    | SIDEBAR_SUBLIST_NAMES.COUNTRY
    | SIDEBAR_SUBLIST_NAMES.PINCODE
    | SIDEBAR_SUBLIST_NAMES.STATE
    | SIDEBAR_SUBLIST_NAMES.PROFILE
    | SIDEBAR_SUBLIST_NAMES.PACKAGE
    | SIDEBAR_SUBLIST_NAMES.PLANS
    | SIDEBAR_SUBLIST_NAMES.TNC
    | SIDEBAR_SUBLIST_NAMES.COMPLIANCE
    | undefined

export type SideBarItems = {
    id: number
    mainListName: SidebarNames
    mainImage: string
    subList: { id: number; txt: SidebarSubListNames; path: string }[]
    isSingle: boolean
    mainPath: string
}

export type InfoBoxes = INFOBOXES.DEFAULT | INFOBOXES.MULTI

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ShowToastFunction = (type: ToastType, message: string, options?: ToastOptions) => void

export type Radios = { value: string; name: string }
export type Currencies = {
    _id: string
    isActive: boolean
    label: string
    value: string
}
export type Languages = {
    _id: string
    isActive: boolean
    label: string
    value: string
}

export enum TermsAndConditionNameEnum {
    WebUser = 'WebUser',
    Administration = 'Administration',
    Employee = 'Employee',
    MoneyBack = 'MoneyBack',
    MobileUser = 'MobileUser',
    Provider = 'Provider',
    Clinic = 'Clinic',
}

export const tnCArray = Object.keys(TermsAndConditionNameEnum).map((key) => ({
    label: key,
    _id: key,
}));
