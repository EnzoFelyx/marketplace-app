import { useBottomSheetStore } from "@/shared/store/bottomsheet-store"
import { useCartStore } from "@/shared/store/cart-store"
import { createElement } from "react"
import { CardBottomSheet } from "./components/CardBottomSheet"

export const useCartViewModel = () => {

    const { products } = useCartStore()

    const { open: openCard } = useBottomSheetStore()

    const openCartBottomSheet = () => {
        openCard({
            content: createElement(CardBottomSheet),
            config: { snapPoints: ["83%", "90%"] }
        })
    }

    return {
        products,
        openCartBottomSheet
    }
}