import { CreditCard } from "@/shared/interface/credit.card"
import { useGetCreditCardQuerys } from "@/shared/queries/credit-cards/use-get-credit-cards.query"
import { useCartStore } from "@/shared/store/cart-store"
import { useState } from "react"

export const useCartFooterViewModel = () => {

    const [selectedCreditCard, setSelectedCreditCard] = useState<null | CreditCard>(null)

    const { data: creditCards = [], isLoading: loadingCreditCard } = useGetCreditCardQuerys()

    const { total } = useCartStore()

    return {
        creditCards,
        loadingCreditCard,
        total,
        setSelectedCreditCard,
        selectedCreditCard
    }
}