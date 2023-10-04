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