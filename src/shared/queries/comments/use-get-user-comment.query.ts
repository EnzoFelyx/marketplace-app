import { getUserComment } from "@/shared/services/product.service"
import { useQuery } from "@tanstack/react-query"

export const useGetUserCommentQuery = (productId: number) => {

    const query = useQuery({
        queryFn: () => getUserComment(productId),
        queryKey: ["user-comment", productId],
        staleTime: 1000 * 60 * 5
    })

    return query
}