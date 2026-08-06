import { UserInterface } from "../user"

export interface AuthResponse {
  token: string
  refreshToken: string
  user: UserInterface
}