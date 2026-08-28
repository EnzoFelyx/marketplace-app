import { marketPlaceApi } from "../api/marketplace"
import { CreateOrdersInterface, GetOrdersInterface, OrdersResponse } from "../interface/http/orders"

export const submitOrder = async (order: CreateOrdersInterface) => {
    const { data } = await marketPlaceApi.post<OrdersResponse>("/orders", order)
    return data
}

export const getOrders = async () => {
    const { data } = await marketPlaceApi.get<GetOrdersInterface>("/orders")
    return data
}