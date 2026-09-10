import { marketPlaceApi } from "../api/marketplace"
import { FavoriteResponse, handleFavoriteResponse } from "../interface/http/favorite"

export const getFavorites = async (): Promise<FavoriteResponse[]> => {
    const { data } = await marketPlaceApi.get<FavoriteResponse[]>('/favorites')
    return data
}

export const addFavorite = async (productId: number) => {
    const { data } = await marketPlaceApi.post<handleFavoriteResponse>('/favorites', { productId })
    return data
}

export const removeFavorite = async (productId: number) => {
    await marketPlaceApi.delete(`/favorites/${productId}`)
}