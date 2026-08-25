import { marketPlaceApi } from "../api/marketplace"
import { createCommentRequest, CreateCommentResponse } from "../interface/http/create-comment"
import { PaginatedResponse } from "../interface/http/paginated-response"
import { GetProductCommentsRequest } from "../interface/http/product-comment-request"
import { GetProductDetailsInterface } from "../interface/http/product-details"
import { ProductRequest } from "../interface/http/product-request"
import { updateCommentRequest, updateCommentResponse } from "../interface/http/update-comment"
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

export const createComment = async (params: createCommentRequest) => {
    const { data } = await marketPlaceApi.post<CreateCommentResponse>("/products/create/comments", params)
    return data
}

export const getUserComment = async (productId: number) => {
    const { data } = await marketPlaceApi.get<{
        comment: {
            id: number
            content: string;
            createdAt: Date
            user: {
                id: number
                name: string
            }
        }
        rating: number
    }>(`/products/${productId}/user-comment`,)
    return data
}

export const updateUserComment = async (params: updateCommentRequest) => {
    const { data } = await marketPlaceApi.put<updateCommentResponse>(`/products/comments/${params.commentId}`, {
        content: params.content,
        rating: params.rating
    })
    return data
}