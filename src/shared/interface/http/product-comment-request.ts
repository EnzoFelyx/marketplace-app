export interface GetProductCommentsRequest {
  productId: number
  pagination: {
    page: number
    perPage: number
  }
}