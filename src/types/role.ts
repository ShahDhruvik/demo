import { SIDEBAR_SUBLIST_NAMES } from '@/utils/constants'
export type RoleFields = {
    name: string
    permission: {
        packages: {
            create: boolean
            view: boolean
            update: boolean
            delete: boolean
        }
        location: {
            create: boolean
            view: boolean
            update: boolean
            delete: boolean
        }
        tnc: {
            create: boolean
            view: boolean
            update: boolean
            delete: boolean
        }
        plans: {
            create: boolean
            view: boolean
            update: boolean
            delete: boolean
        }
        compliance: {
            create: boolean
            view: boolean
            update: boolean
            delete: boolean
        }
    }
}

export type RoleData = {
    name: string
    permissions: {
        packages: {
            create: boolean
            view: boolean
            update: boolean
            delete: boolean
        }
        location: {
            create: boolean
            view: boolean
            update: boolean
            delete: boolean
        }
        tnc: {
            create: boolean
            view: boolean
            update: boolean
            delete: boolean
        }
        plans: {
            create: boolean
            view: boolean
            update: boolean
            delete: boolean
        }
        compliance: {
            create: boolean
            view: boolean
            update: boolean
            delete: boolean
        }
    }
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: 0
    _id: string
}
