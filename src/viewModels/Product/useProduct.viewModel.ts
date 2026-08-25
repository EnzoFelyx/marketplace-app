import { useGetCommentsInfiniteQuery } from "@/shared/queries/product/use-get-product-comments"
import { useGetProductDetailsQuery } from "@/shared/queries/product/use-get-product-details"
import { useCartStore } from "@/shared/store/cart-store"
import { useModalStore } from "@/shared/store/modal-store"
import { createElement } from "react"
import { CartSucessModal } from "./components/CartSucessModal"
import { router } from "expo-router"

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

    const { addProduct } = useCartStore()

    const { openModal, closeModal } = useModalStore()

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

    const onGoToCart = () => {
        router.push("/(private)/(tabs)/cart")
        closeModal()
    }

    const onContinueShopping = () => {
        router.push("/(private)/(tabs)/home")
        closeModal()
    }

    const handleAddToCart = () => {
        if (!productDetails) return

        addProduct({
            id: productDetails.id,
            name: productDetails.name,
            price: productDetails.value,
            image: productDetails.photo
        })

        openModal(createElement(CartSucessModal, {
            productName: productDetails.name,
            onGoToCart,
            onClose: closeModal,
            onContinueShopping,
        }))
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
        handleAddToCart
    }
}