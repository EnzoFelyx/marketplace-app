export interface ProductRequest {
    pagination: {
        page: number
        perPage: number
    },
    filters?: {
        from?: Date
        to?: Date
        categoryIds: number[]
        searchText?: string
        minValue?: number
        maxValue?: number
    },
    sort?: {
        averageRating: string
    }
}