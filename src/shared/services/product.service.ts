import { marketPlaceApi } from "../api/marketplace"
import { ProductRequest } from "../interface/http/product-request"
import { ProductResponse } from "../interface/http/product-response"
import { ProductCategory } from "../interface/product"

export const getProducts = async (params: ProductRequest) => {
    const { data } = await marketPlaceApi.post<ProductResponse>("/products", params)
    return data
}

export const getProductsCategories = async () => {
    const { data } = await marketPlaceApi.get<ProductCategory[]>("products/categories")
    return data
}