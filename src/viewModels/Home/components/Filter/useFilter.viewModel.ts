import { useGetProductCategoriesQuery } from "@/shared/queries/product/use-get-prodcut-categories"
import { useBottomSheetStore } from "@/shared/store/bottomsheet-store"
import { useFilterStore } from "@/shared/store/use-filter-store"

export const useFilterViewModel = () => {

    const {
        data: productsCategory,
        isLoading,
    } = useGetProductCategoriesQuery()

    const {
        updateFilter,
        FilterState,
        applieFilter,
        appliedFilterState,
        resetFilter
    } = useFilterStore()

    const { close } = useBottomSheetStore()

    const handleValueMaxChange = (value: number) => {
        updateFilter({ key: "valueMax", value })
    }

    const handleValueMinChange = (value: number) => {
        updateFilter({ key: "valueMin", value })
    }

    const handleCategoryToggle = (categoryId: number) => {
        const categoryAlreadyInArray = FilterState.selectedCategories.includes(categoryId)

        if (categoryAlreadyInArray) {
            updateFilter({
                key: "selectedCategories",
                value: FilterState.selectedCategories.filter((id) => id !== categoryId),
            })
        } else {
            updateFilter({
                key: "selectedCategories",
                value: [...FilterState.selectedCategories, categoryId]
            })
        }
    }

    const handleApplyFilters = () => {
        applieFilter()
        close()
    }

    const handleResetFilter = () => {
        close()
        resetFilter()
    }

    return {
        productsCategory,
        isLoading,
        handleCategoryToggle,
        handleValueMaxChange,
        handleValueMinChange,
        selectedCategories: FilterState.selectedCategories,
        handleApplyFilters,
        handleResetFilter
    }
}