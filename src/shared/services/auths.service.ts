import { marketPlaceApi } from "../api/marketplace";
import { AuthResponse } from "../interface/http/auth-response";
import { LoginHTTPParams } from "../interface/http/login";
import { RegisterHTTPParams } from "../interface/http/register";

export const register = async (userData: RegisterHTTPParams) => {

    const { data } = await marketPlaceApi.post<AuthResponse>(
        "/auth/register",
        userData
    )

    return data
}

export const login = async (userData: LoginHTTPParams) => {

    const { data } = await marketPlaceApi.post<AuthResponse>("/auth/login", userData)

    return data
}