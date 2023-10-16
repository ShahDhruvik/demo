import { SearchDDL } from './common'

export type ComplianceFields = {
    name: SearchDDL
    countryIds: SearchDDL[]
    revisionDate: Date | null
    header: string
    image: File | null
    description: { subHeader: string, description: string }[]
    revisionVersion: string
}

// export type PackageData = {
//     _id: string
//     title: string
//     discount: string
//     description: string
//     isParent: boolean
//     isPremium: boolean
//     isInternal: boolean
//     image: string
//     price: string
//     points: string[]
//     isActive: boolean
//     isDeleted: boolean
//     createdAt: string
//     updatedAt: string
//     __v: 0
//     packages: any[]
//     tag: string[]
// }
