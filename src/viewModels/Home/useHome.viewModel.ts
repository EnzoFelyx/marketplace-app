import { useProductInfiniteQuery } from "@/shared/queries/product/use-product-infinite.query"
import { FilterState, useFilterStore } from "@/shared/store/use-filter-store"



export const useHomeViewModel = () => {

    const { appliedFilterState } = useFilterStore()

    const {
        products,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isRefetching,
        refetch
    } = useProductInfiniteQuery({filters: appliedFilterState})

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage && !isLoading) {
            fetchNextPage()
        }
    }

    const handleRefresh = async () => {
        await refetch()
    }

    const handleEndReached = () => {
        handleLoadMore()
    }

    return {
        handleLoadMore,
        handleRefresh,
        products,
        handleEndReached,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        isRefetching,
    }

}