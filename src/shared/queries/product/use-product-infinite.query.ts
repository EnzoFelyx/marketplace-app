import { getProducts } from "@/shared/services/product.service"
import { FilterState } from "@/shared/store/use-filter-store"
import { useInfiniteQuery } from "@tanstack/react-query"

interface ProductsInfinityQueryParams {
    filters?: FilterState
}

export const useProductInfiniteQuery = ({ filters }: ProductsInfinityQueryParams) => {

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
        isRefetching
    } = useInfiniteQuery({
        queryFn: async ({ pageParam }) => {
            try {
                const response = await getProducts({
                    pagination: {
                        page: pageParam,
                        perPage: 10, //quantidade de busca por pagina
                    },
                    filters: {
                        categoryIds: filters?.selectedCategories ?? [],
                        maxValue: filters?.valueMax ?? undefined,
                        minValue: filters?.valueMin ?? undefined,
                        searchText: filters?.searchText ?? undefined
                    }
                }) // funcao que faz a busca por pagina
                return response
            } catch (error) {
                throw error
            }
        },
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined
        }, //controle de paginação
        initialPageParam: 1, //pagina inicial
        queryKey: ["products", filters],
        staleTime: 1000 * 60 * 1,
    })

    const products = data?.pages.flatMap((page) => page.data)

    return {
        products,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
        isRefetching,
    }

}