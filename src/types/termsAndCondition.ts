import { EditorValue } from 'react-rte'
import { SearchDDL } from './common'

export type TNCFields = {
    name: SearchDDL
    countryIds: SearchDDL[]
    effectiveDate: Date | null
    revisionDate: Date | null
    header: string
    image: File | null
    description: { title: string, description: string }[]
    revisionVersion: string
}

export type TNCData = {
    _id: string
    name: string
    countryIds: string[]
    effectiveDate: string
    revisionDate: string
    header: string
    image: string
    revisionVersion: string
    description: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
    countries: {
        _id: string
        name: string
        shortName: string
        code: number
        isoCode: string
        isActive: true
        isDeleted: false
        createdAt: string
        updatedAt: string
        __v: number
    }[],
    subheaders: { title: string, description: string }[]
}
