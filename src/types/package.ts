export type PackageFields = {
    title: string
    price: string
    discount: string
    tag: string
    image: string
    points: string[]
}
export type PackageData = {
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
