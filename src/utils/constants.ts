import { HeadCell } from "@/types/common";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

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
  DASHBOARD = 'DASHBOARD',

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