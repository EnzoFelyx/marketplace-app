import { marketPlaceApi } from "../api/marketplace";
import { RegisterHTTPParams, RegisterHTTPResponse } from "../interface/http/register";

export const register = async (userData: RegisterHTTPParams) => {

    const { data } = await marketPlaceApi.post<RegisterHTTPResponse>(
        "/auth/register",
        userData
    )

    return data
}