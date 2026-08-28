import { OrderInterface } from "../order"

export interface CreateOrdersInterface {
    creditCardId: number,
    items:
    {
        productId: number,
        quantity: number
    }[]
}

export interface OrdersResponse {
    message: string,
    ordersCount: number,
    orders:
    {
        id: number,
        productId: number,
        quantity: number,
        totalPrice: number
    }[]

}

export interface GetOrdersInterface {
    orders: OrderInterface[]
    totalOrders: number
}

