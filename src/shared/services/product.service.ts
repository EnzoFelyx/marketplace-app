import { marketPlaceApi } from "../api/marketplace"
import { ProductRequest } from "../interface/http/product-request"
import { ProductResponse } from "../interface/http/product-response"

export const getProducts = async (params: ProductRequest) => {
    const { data } = await marketPlaceApi.post<ProductResponse>("/products", params)
    return data
}