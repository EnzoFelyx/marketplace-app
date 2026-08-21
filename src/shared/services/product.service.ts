import { marketPlaceApi } from "../api/marketplace"
import { PaginatedResponse } from "../interface/http/paginated-response"
import { GetProductCommentsRequest } from "../interface/http/product-comment-request"
import { GetProductDetailsInterface } from "../interface/http/product-details"
import { ProductRequest } from "../interface/http/product-request"
import { ProductCategory, ProductInterface } from "../interface/product"
import { ProductComment } from "../interface/product-comment"

export const getProducts = async (params: ProductRequest) => {
    const { data } = await marketPlaceApi.post<PaginatedResponse<ProductInterface>>("/products", params)
    return data
}

export const getProductsCategories = async () => {
    const { data } = await marketPlaceApi.get<ProductCategory[]>("products/categories")
    return data
}

export const getProductDetails = async (id: number) => {
    const { data } = await marketPlaceApi.get<GetProductDetailsInterface>(`/products/${id}`)
    return data
}

export const getProductComments = async (params: GetProductCommentsRequest) => {
    const { data } = await marketPlaceApi.post<PaginatedResponse<ProductComment>>(`/products/comments`, params)
    return data
}