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
        avatar?: {
            url: string
        } | null
        rating: {
            value: number
        }
    }
}

/**
 * O comentário depois de passar pelo resolveFileUrl: mesma forma da API,
 * só que o avatar sempre existe e a url pode ser null (quando o usuário
 * não tem foto).
 */
export type ResolvedProductComment = Omit<ProductComment, "user"> & {
    user: Omit<ProductComment["user"], "avatar"> & {
        avatar: {
            url: string | null
        }
    }
}