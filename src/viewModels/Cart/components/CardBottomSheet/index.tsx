import { CardBottomSheetView } from "./CardBottom.view"
import { useCardBottomSheetViewModel } from "./useCardBottomSheet.viewModel"

export const CardBottomSheet = () => {

    const viewModel = useCardBottomSheetViewModel()

    return <CardBottomSheetView {...viewModel} />
}