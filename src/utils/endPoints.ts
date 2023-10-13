// All the endpoints of API are defined here
const enum USER {
  create = '/user/create',
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
