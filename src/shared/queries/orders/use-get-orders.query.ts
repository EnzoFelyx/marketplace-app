import { getOrders } from "@/shared/services/order.service"
import { useQuery } from "@tanstack/react-query"

export const useGetOrdersQuery = () => {

    const query = useQuery({
        queryFn: getOrders,
        queryKey: ["user-orders"],
        staleTime: 1000 * 60 * 10
    })

    return query
}