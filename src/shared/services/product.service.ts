import { marketPlaceApi } from "../api/marketplace"
import { ProductResponse } from "../interface/http/product-response"

interface ProductRequest {
    pagination: {
        page: number
        perPage: number
    },
    filters: {
        from: Date
        to: Date
        categoryIds: number[]
        searchText: string
        minValue: number
        maxValue: number
    },
    sort: {
        averageRating: string
    }
}

export const getProducts = async (params: ProductRequest) => {
    const { data } = await marketPlaceApi.post<ProductResponse>("/products", params)
    return data
}