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
    countryId: string
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
