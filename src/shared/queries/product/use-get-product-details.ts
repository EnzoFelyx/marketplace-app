import { getProductDetails } from "@/shared/services/product.service"
import { useQuery } from "@tanstack/react-query"

export const useGetProductDetailsQuery = (productId: number) => {

    const query = useQuery({
        queryFn: async () => getProductDetails(productId),
        queryKey: ["product-detail", productId]
    })

    return {
        query
    }
}