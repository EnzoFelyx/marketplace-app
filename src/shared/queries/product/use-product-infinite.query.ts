import { getProducts } from "@/shared/services/product.service"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useProductInfiniteQuery = () => {

    const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch, isRefetching } = useInfiniteQuery({
        queryFn: async ({ pageParam }) => {
            try {
                const response = await getProducts({
                    pagination: {
                        page: pageParam,
                        perPage: 10, //quantidade de busca por pagina
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
        queryKey: ["prodcuts"],
        staleTime: 1000,
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