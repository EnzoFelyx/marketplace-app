import { baseURL, marketPlaceApi } from "../api/marketplace";
import { AuthResponse } from "../interface/http/auth-response";
import { LoginHTTPParams } from "../interface/http/login";
import { RegisterHTTPParams } from "../interface/http/register";
import { UploadAvatarResponse } from "../interface/http/upload-avatar";

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

export const uploadAvatar = async (avatarURI: string) => {
    const formData = new FormData()

    formData.append("avatar", {
        uri: avatarURI,
        type: "image/jpeg",
        name: "acatar.jpeg"
    } as unknown as Blob)

    const { data } = await marketPlaceApi.post<UploadAvatarResponse>("/user/avatar")
    
    data.url = `${baseURL}${data.url}`

    return data
}