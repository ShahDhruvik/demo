// All the endpoints of API are defined here 
export const enum DEF_PATHS {
  COMMON = '/common'
}

export const enum COUNTRY_PATH {
  CREATE = '/country/create',
  GET = '/country',
  EDIT = '/country/edit',
  INACTIVE = '/country/inactive',
  DELETE = '/country/delete',
  DROPDOWN = '/country/dropdown',
}

export const enum STATE_PATH {
  CREATE = '/state/create',
  GET = '/state',
  EDIT = '/state/edit',
  INACTIVE = '/state/inactive',
  DELETE = '/state/delete',
}
export const enum CITY_PATH {
  CREATE = '/city/create',
  GET = '/city',
  EDIT = '/city/edit',
  INACTIVE = '/city/inactive',
  DELETE = '/city/delete',
  DROPDOWN = '/city/dropdown',
}
export const enum PINCODE_PATH {
  CREATE = '/pin-code/create',
  GET = '/pin-code',
  EDIT = '/pin-code/edit',
  INACTIVE = '/pin-code/inactive',
  DELETE = '/pin-code/delete',
  DROPDOWN = '/pin-code/dropdown',
}
export const enum FAQ {
  create = '/common/dashboard/faq/create',
  getAll = '/common/dashboard/faq',
  edit = '/common/dashboard/faq/edit/',
  delete = '/common/dashboard/faq/delete/',
  inActive = '/common/dashboard/faq/inactive/',
}

export const enum BANNER_SLIDER {
  create = '/common/dashboard/banner-slider/create',
  getAll = '/common/dashboard/banner-slider',
  edit = '/common/dashboard/banner-slider/edit/',
  delete = '/common/dashboard/banner-slider/delete/',
  inActive = '/common/dashboard/banner-slider/inactive/',
}

export const enum QNA {
  create = '/common/question-answer/create',
  getAll = '/common/question-answer',
  edit = '/common/question-answer/edit/',
  delete = '/common/question-answer/delete/',
  inActive = '/common/question-answer/inactive/',
  treatmentPlan = '/common/treatment-plan',
}
