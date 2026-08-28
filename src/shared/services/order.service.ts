import { marketPlaceApi } from "../api/marketplace"
import { CreateOrdersInterface, OrdersResponse } from "../interface/http/orders"

export const submitOrder = async (order: CreateOrdersInterface) => {
    const { data } = await marketPlaceApi.post<OrdersResponse>("/orders", order)
    return data
}