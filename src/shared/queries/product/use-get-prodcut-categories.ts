import { getProductsCategories } from "@/shared/services/product.service"
import { useQuery } from "@tanstack/react-query"

export const useGetProductCategoriesQuery = () => {
    const query = useQuery({
        queryKey: ["products-categories"],
        queryFn: getProductsCategories,
        staleTime: 1000 * 60 * 60
    })

    return query
}