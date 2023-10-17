import { SearchDDL } from "./common"

export type UserFields = {
    name: string,
    roleId: SearchDDL
    email: string
    contactNo: string,
    dob: Date | null,
    password: string,
    confirmPassword: string
}