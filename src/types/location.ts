import { SearchDDL } from "./common"

export type StatesField = {
    name: string
    shortName: string
}
export type CountryFields = {
    name: string
    shortName: string
    isoCode: string
    code: number | string
    states: StatesField[]
    secondaryCun: SearchDDL
    primaryCun: SearchDDL

}

export type CountryData = {
    code: number
    createdAt: string
    isActive: boolean
    isDeleted: boolean
    isoCode: string
    name: string
    shortName: string
    updatedAt: string
    __v: number
    _id: string
}
export type StateFields = {
    name: string
    countryId: SearchDDL
    shortName: string
    cities: {
        name: string
        shortName: string
    }[]
}

export type StateData = {
    _id: string
    name: string
    shortName: string
    countryId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
    country: string
}
export type CityFields = {
    name: string
    stateId: SearchDDL
    countryId: SearchDDL
    shortName: string
    pinCodes: { value: string, isAvailable: boolean }[]
}

export type CityData = {
    _id: string
    name: string
    shortName: string
    countryId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
    country: string
}

export type PincodeFields = {
    stateId: SearchDDL
    countryId: SearchDDL
    cityId: SearchDDL
    value: string,
    isAvailable: boolean
    primaryLan: SearchDDL
    secondaryLan: SearchDDL
    thirdLan: SearchDDL
}

export type PincodeData = {
    _id: string
    name: string
    shortName: string
    countryId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
    country: string
}
