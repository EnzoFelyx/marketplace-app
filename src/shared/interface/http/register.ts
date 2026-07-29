import { UserInterface } from "../user"

export interface RegisterHTTPParams {
  name: string
  email: string
  avatarUrl?: string
  phone: string
  password: string
}

export interface RegisterHTTPResponse {
  token: string
  refreshToken: string
  user: UserInterface
}