import { useProductInfiniteQuery } from "@/shared/queries/product/use-product-infinite.query"

interface Props {

}

export const useHomeViewModel = () => {

    const {
        products,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isRefetching,
        refetch
    } = useProductInfiniteQuery()

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage && !isLoading) {
            fetchNextPage()
        }
    }

    const handleRefresh = async () => {
        await refetch()
    }

    return {
        handleLoadMore,
        handleRefresh,
        products
    }

}