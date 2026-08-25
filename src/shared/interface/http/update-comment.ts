export interface updateCommentRequest {
    content: string
    commentId: number
    rating: number
}

export interface updateCommentResponse {
    message: string
    ratingUpdated: true
    comment: {
        id: number
        content: string
        createdAt: Date
        updatedAt: Date
    }
}