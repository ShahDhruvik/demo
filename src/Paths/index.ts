export const enum MAIN_PATH {
  AUTH = '/auth/*',
  DASHBOARD = '/*',
  UNAUTHORIZED = '/unauthorized',
}

export const enum COMMON_PATH {
  NOTFOUND = '*',
  DEFAULT = '/',
}

export const enum AUTH_PATH {
  LOGIN = '/login',
  LOGOUT = '/log-out',
}

export const enum DASHBOARD_PATH {
  PROFILE = '/profile',
}
