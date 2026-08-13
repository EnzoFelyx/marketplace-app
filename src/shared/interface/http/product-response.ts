import { ProductInterface } from "../product"

export interface ProductResponse {
    page: number
    perPage: number
    total: number
    totalPages: number
    data: ProductInterface[]
}