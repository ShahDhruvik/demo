export const enum MAIN_PATH {
  AUTH = '/auth/*',
  DASHBOARD = '/*',
  UNAUTHORIZED = '/unauthorized',
}
export const enum COMMON_PATH {
  NOTFOUND = '*',
  DEFAULT = '/',
}

export const enum DASHBOARD_PATH {
  MASTER = '/',
  ABOUT = '/about/*',
  LOCATION = '/location/*',
}

export const enum AUTH_PATH {
  LOGIN = '/login',
  LOGOUT = '/log-out',
}



export const enum ABOUT_PATH {
  CONTACT = '/contact',
}
export const enum LOCATION_PATH {
  COUNTRY = '/country',
  STATE = '/state',
  CITY = '/city',
  PINCODE = '/pincode',
}
