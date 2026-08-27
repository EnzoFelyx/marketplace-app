import { useBottomSheetStore } from "@/shared/store/bottomsheet-store"
import { useCartStore } from "@/shared/store/cart-store"
import { createElement } from "react"
import { CardBottomSheet } from "./components/CardBottomSheet"
import { useGetCreditCardQuerys } from "@/shared/queries/credit-cards/use-get-credit-cards.query"

export const useCartViewModel = () => {

    const { products } = useCartStore()

    const { data: creditCards = [], isLoading: loadingCreditCard } = useGetCreditCardQuerys()

    const { open: openCard } = useBottomSheetStore()

    const openCartBottomSheet = () => {
        openCard({
            content: createElement(CardBottomSheet)
        })
    }

    return {
        products,
        openCartBottomSheet,
        creditCards,
        loadingCreditCard
    }
}