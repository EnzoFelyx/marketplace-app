import { UserInterface } from "../user"

export interface updateProfileParams {
    name: string,
    email: string
    phone: string
    password?: string
    newPassword?: string
}

export interface updateProfileResponse extends UserInterface {
    updatedAt: string
    deletedAt: string
}
