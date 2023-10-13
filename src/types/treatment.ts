import { SearchDDL } from './common'

export type TreatmentFields = {
    title: string
    packages: SearchDDL[]
}

export type TreatmentData = {
    _id: string
    title: string
    discount: string
    description: string
    isParent: boolean,
    isPremium: boolean,
    isInternal: boolean,
    image: string
    price: string
    points: string[]
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: 0
    packages: any[]
    tag: string[]
}
