import { useGetProductDetailsQuery } from "@/shared/queries/product/use-get-product-details"

export const useProductViewModel = (productId: number) => {

    const {
        data: productDetails,
        isLoading,
        error,
    } = useGetProductDetailsQuery(productId)

    return {
        productDetails,
        isLoading,
        error
    }
}