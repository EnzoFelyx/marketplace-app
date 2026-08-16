import { useGetProductCategoriesQuery } from "@/shared/queries/product/use-get-prodcut-categories"

export const useFilterViewModel = () => {

    const {
        data: productsCategory,
        isLoading,
        error,
        refetch
    } = useGetProductCategoriesQuery()

    return {
        productsCategory,
        isLoading
    }
}