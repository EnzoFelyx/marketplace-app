import { useGetCommentsInfiniteQuery } from "@/shared/queries/product/use-get-product-comments"
import { useGetProductDetailsQuery } from "@/shared/queries/product/use-get-product-details"

export const useProductViewModel = (productId: number) => {

    const {
        data: productDetails,
        isLoading,
        error,
    } = useGetProductDetailsQuery(productId)

    const {
        comment,
        isLoading: getCommentsLoading,
        hasNextPage,
        fetchNextPage,
        refetch,
        error: getCommentsErro,
        isRefetching,
        isFetchingNextPage
    } = useGetCommentsInfiniteQuery(productId)

    const handleLoadingMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }

    const handleRefetch = () => {
        if (!isRefetching) {
            refetch()
        }
    }

    const handleEndReached = () => {
        handleLoadingMore()
    }

    return {
        productDetails,
        isLoading,
        error,
        handleEndReached,
        handleLoadingMore,
        handleRefetch,
        getCommentsErro,
        getCommentsLoading,
        comment,
        isRefetching,
        isFetchingNextPage,
    }
}