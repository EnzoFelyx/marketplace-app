import { getProductComments } from "@/shared/services/product.service"
import { resolveFileUrl } from "@/shared/utils/resolve-file-url"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useGetCommentsInfiniteQuery = (productId: number) => {

    const query = useInfiniteQuery({
        queryFn: ({ pageParam = 1 }) => getProductComments({
            productId: productId,
            pagination: {
                perPage: 20,
                page: pageParam
            },
        }),
        queryKey: ["product-comments", productId],
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.totalPages) {
                return lastPage.page + 1
            } return undefined
        },
        initialPageParam: 1
    })

    const comment = query.data?.pages.flatMap((page) => page.data).map((comment) => ({
        ...comment,
        user: {
            ...comment.user,
            avatar: {
                url: resolveFileUrl(comment.user.avatar.url)
            }
        }
    })) ?? []

    return {...query, comment}
}