import { SearchDDL } from './common'

export type PackageFields = {
    title: string
    price: string
    discount: string
    tag: string[]
    description: string
    isParent: boolean
    isPremium: boolean
    isInternal: boolean
    points: string[]
    packageImage: File | null
    packages: SearchDDL[]
}

export type PackageData = {
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
