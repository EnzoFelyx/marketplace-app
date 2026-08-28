import { useGetOrdersQuery } from "@/shared/queries/orders/use-get-orders.query"

export const useOrdersViewModel = () => {

    const { data: ordersResponse, error, isLoading } = useGetOrdersQuery()

    const orders = ordersResponse?.orders ?? []

    return {
        orders,
        error,
        isLoading
    }
}