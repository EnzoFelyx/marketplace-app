import { useDebounce } from "@/shared/hooks/useDebounce"
import { useProductInfiniteQuery } from "@/shared/queries/product/use-product-infinite.query"
import { FilterState, useFilterStore } from "@/shared/store/use-filter-store"
import { useState } from "react"



export const useHomeViewModel = () => {

    const { appliedFilterState } = useFilterStore()

    const [searchInputText, setSearchInputText] = useState("")

    const currentSearchText = useDebounce(searchInputText)

    const {
        products,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isRefetching,
        refetch
    } = useProductInfiniteQuery({ filters: { ...appliedFilterState, searchText: currentSearchText } })

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

    const isInitialLoading = isLoading && !isRefetching

    return {
        handleLoadMore,
        handleRefresh,
        products,
        handleEndReached,
        isInitialLoading,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        isRefetching,
        setSearchInputText,
        searchInputText
    }

}