import { FilterView } from "./Filter.view"
import { useFilterViewModel } from "./useFilter.viewModel"

export const Filter = () => {

    const props = useFilterViewModel()

    return (
        <FilterView {...props}/>
    )
}