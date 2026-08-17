import { create } from "zustand";

export interface FilterState {
    valueMin: number | null
    valueMax: number | null
    selectedCategories: number[]
    searchText: string
}

interface FilterProps {
    appliedFilterState: FilterState
    FilterState: FilterState
    updateFilter: (props: {
        key: keyof FilterState
        value: string | number | number[]
    }) => void
    resetFilter: () => void
    applieFilter: () => void
}

const defaultFilterValues = {
    searchText: "",
    selectedCategories: [],
    valueMax: null,
    valueMin: null,
}

export const useFilterStore = create<FilterProps>((set) => ({
    appliedFilterState: defaultFilterValues,
    FilterState: defaultFilterValues,
    updateFilter: ({ key, value }) => {
        set((state) => ({
            FilterState: { ...state.FilterState, [key]: value }
        }))
    },
    resetFilter: () => set({
        appliedFilterState: defaultFilterValues,
        FilterState: defaultFilterValues
    }),
    applieFilter: () => set((state) => ({
        appliedFilterState: state.FilterState
    }))
}))