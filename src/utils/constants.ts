import { HeadCell, SideBarItems } from "@/types/common";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { ABOUT_PATH, COMMON_PATH, DASHBOARD_PATH, LOCATION_PATH, } from "../paths";

// ALl your constants and enums. This includes pre-defined functions and other commonly used variables. ex: date-format functions, other standarad maintaining function
export const x = 10



export const enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const enum CACHE_KEYS {
  POST = 'post',
  USER = 'user',
  TODO1 = 'todo1',
}

export const enum TOAST_TYPES {
  SUCCESS = 'Success',
  ERROR = 'Error',
  WARN = 'Warning',
  INFO = 'Info',
}

export const enum ALIGN_DIALOG {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

export const splitDescription = (description: string, length?: number) => {
  const maxCharac = length ? length : 15;
  if (description.length > maxCharac) {
    return description.slice(0, maxCharac).concat('...');
  } else {
    return description;
  }
};

export const drawerWidth = 260

export const enum DASHBOARDTYPE {
  ASSET = 'ASSET',
  SCHEDULE = 'SCHEDULE',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE',
  EXECUTE = 'EXECUTE',
}
export const enum HEADERBTNS {
  CREATE = 'CREATE'
}
export const enum TABLES {
  COUNTRY = 'COUNTRY',

}

export const formatDate = (dateString: string) => {
  if (typeof dateString === 'string') {
    const parsedDate = parseISO(dateString);
    const formattedDate = format(parsedDate, "dd MMMM',' yyyy", { locale: enUS });
    return formattedDate;
  } else {
    return ''
  }
};
export const limitOfPage = 10
export const sortTableRowsByHeadCells = (tableRow: any[], headCell: HeadCell[]) => {
  const sortedTableRows: any = [];
  headCell.map((cell) => {
    const matchingRow = tableRow.find((row) => row === cell.id);
    if (matchingRow) {
      sortedTableRows.push(cell);
    } else {
      sortedTableRows.push(cell)
    }
  });
  return sortedTableRows;
};


export const enum ACTIONS_TABLE {
  ADD = "ADD",
  EDIT = "EDIT",
  DELETE = "DELETE",
  SWITCH = "SWITCH",
  MAP = "MAP",
  VIEW = "VIEW",
  DASHBOARDEDIT = "DASHBOARDEDIT",
}
export const enum TABLE_STATES {
  ADD = "ADD",
  EDIT = "EDIT",
  DELETE = "DELETE",
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  VIEW = "VIEW",
  MAP = "MAP",
  DASHBOARDEDIT = "DASHBOARDEDIT",

}

export const enum SIDEBAR_NAMES {
  MASTER = 'MASTER',
  ABOUT = 'About',
  PROFILE = 'Profile',
  LOCATION = 'Location',
}

export const sidebarItems: SideBarItems[] = [
  {
    id: 0,
    mainListName: SIDEBAR_NAMES.MASTER,
    mainImage: 'home',
    subList: [
      { id: 1, iconName: 'ser', txt: 'City', path: '/' },
      { id: 2, iconName: 'ser', txt: 'Pincode', path: '/' },
    ],
    isSingle: false,
    mainPath: `${COMMON_PATH.DEFAULT}`,
  },
  {
    id: 1,
    mainListName: SIDEBAR_NAMES.ABOUT,
    mainImage: 'about',
    subList: [
      {
        id: 0,
        iconName: 'ser',
        txt: 'Contact',
        path: `${DASHBOARD_PATH.ABOUT.split('/*')[0]}${ABOUT_PATH.CONTACT}`,
      },
    ],
    isSingle: false,
    mainPath: `${DASHBOARD_PATH.ABOUT.split('/*')[0]}`,
  },
  {
    id: 2,
    mainListName: SIDEBAR_NAMES.PROFILE,
    mainImage: 'about',
    subList: [
      {
        id: 0,
        iconName: 'ser',
        txt: 'Contact',
        path: `/`,
      },
    ],
    isSingle: false,
    mainPath: `/`,
  },
  {
    id: 3,
    mainListName: SIDEBAR_NAMES.LOCATION,
    mainImage: 'location',
    subList: [
      {
        id: 0,
        iconName: 'location',
        txt: 'Country',
        path: `${DASHBOARD_PATH.LOCATION.split('/*')[0]}${LOCATION_PATH.COUNTRY}`,
      },
      {
        id: 0,
        iconName: 'location',
        txt: 'State',
        path: `${DASHBOARD_PATH.LOCATION.split('/*')[0]}${LOCATION_PATH.STATE}`,
      },
    ],
    isSingle: false,
    mainPath: `${DASHBOARD_PATH.LOCATION.split('/*')[0]}`,
  },
]