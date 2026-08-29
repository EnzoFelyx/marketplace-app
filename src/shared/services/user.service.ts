import { marketPlaceApi } from "../api/marketplace"
import { updateProfileParams, updateProfileResponse } from "../interface/http/update-profile"

export const UpdateUser = async (body: updateProfileParams) => {
    const { data } = await marketPlaceApi.put<updateProfileResponse>("/user", body)
    return data
}