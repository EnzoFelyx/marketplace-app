export interface ProductComment {
    id: number
    content: string
    productId: number
    userId: string
    createdAt: string
    user: {
        id: number
        name: string
        eamil: string
        avatar: {
            url: string
        }
        rating: {
            value: number
        }
    }
}