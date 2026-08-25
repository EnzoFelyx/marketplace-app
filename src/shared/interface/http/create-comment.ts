export interface createCommentRequest {
    content: string
    productId: number
    rating: number
}

export interface CreateCommentResponse {
    message: string
    ratingApplied: boolean
}