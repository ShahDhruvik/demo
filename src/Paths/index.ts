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
  FAQ = '/faq/*',
  BANNER_SLIDER = '/banner-slider/*',
  QUESTION_ANSWER = '/question-answer/*',
}

export const enum AUTH_PATH {
  LOGIN = '/login',
  LOGOUT = '/log-out',
}

export const enum MASTER_PATH {
  COUNTRY = '/country',
}

export const enum ABOUT_PATH {
  CONTACT = '/contact',
}

export const enum FAQ_PATH {
  FAQ = '/faq',
}
