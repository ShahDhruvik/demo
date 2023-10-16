import { SearchDDL } from './common'

export type Plans = {
  coverageType: SearchDDL
  planNo: string
  memberId: string[]
}

export type insuranceCompanyFields = {
  name: string
  addressLineOne: string
  addressLineTwo: string
  pinCodeId: SearchDDL
  cityId: SearchDDL
  stateId: SearchDDL
  countryId: SearchDDL
  plans: Plans[]
  // planNo: any
  // memberId: any
  description: string
  contact: string
  // coverageType: SearchDDL
  logo: string
  website: string
  fax: string
  phone: string
  email: string
}

export type insuranceCompanyData = {
  _id: string
  name: string
  addressLineOne: string
  addressLineTwo: string
  pinCodeId: SearchDDL
  cityId: SearchDDL
  stateId: SearchDDL
  countryId: SearchDDL
  // planNo: any
  // memberId: any
  description: string
  contact: string
  // coverageType: SearchDDL
  plans: Plans[]
  logo: string
  website: string
  fax: string
  phone: string
  email: string
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
