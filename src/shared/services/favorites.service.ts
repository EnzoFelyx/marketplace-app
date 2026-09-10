import { marketPlaceApi } from "../api/marketplace"
import { FavoriteResponse } from "../interface/http/favorite"

export const getFavorites = async (): Promise<FavoriteResponse[]> => {
    const { data } = await marketPlaceApi.get<FavoriteResponse[]>('/favorites')
    return data
}

export const addFavorite = async (productId: number) => {
    await marketPlaceApi.post('/favorites', { productId })
}

export const removeFavorite = async (productId: number) => {
    await marketPlaceApi.delete(`/favorites/${productId}`)
}