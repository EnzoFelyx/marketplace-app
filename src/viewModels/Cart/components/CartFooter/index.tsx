import { FC } from "react"
import { CartFooterView } from "./CartFooter.view"
import { useCartFooterViewModel } from "./useCartFooter.viewModel"

export interface CartFooterParams {
    openCartBottomSheet: () => void
}

export const CartFooter: FC<CartFooterParams> = ({ openCartBottomSheet }) => {

    const viewModel = useCartFooterViewModel()

    return (
        <CartFooterView
            openCartBottomSheet={openCartBottomSheet}
            {...viewModel}
        />
    )
}