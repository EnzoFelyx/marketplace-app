import { useModal } from "@/shared/hooks/useModal"
import { CreditCard } from "@/shared/interface/credit.card"
import { useGetCreditCardQuerys } from "@/shared/queries/credit-cards/use-get-credit-cards.query"
import { useSubmitOrdersMutation } from "@/shared/queries/orders/use-submit-orders.mutation"
import { useCartStore } from "@/shared/store/cart-store"
import { router } from "expo-router"
import { useState } from "react"

export const useCartFooterViewModel = () => {

    const [selectedCreditCard, setSelectedCreditCard] = useState<null | CreditCard>(null)

    const createOrderMutation = useSubmitOrdersMutation()

    const { showSucess } = useModal()

    const { total, products, clearCart } = useCartStore()


    const submmitOrderMutation = async () => {
        if (!selectedCreditCard) return
        await createOrderMutation.mutation.mutateAsync({
            creditCardId: selectedCreditCard.id,
            items: products.map(({ id, quantity }) => ({ productId: id, quantity }))
        })
        clearCart()

        showSucess({
            title: "Sucesso!",
            message: "Pedido feito com sucesso.",
            buttonText: "Ver pedidos",
            onButtonPress: () => {
                router.push("/orders")
            }
        })
    }

    const { data: creditCards = [], isLoading: loadingCreditCard } = useGetCreditCardQuerys()

    return {
        creditCards,
        loadingCreditCard,
        total,
        setSelectedCreditCard,
        selectedCreditCard,
        submmitOrderMutation,
        isOrderLoading: createOrderMutation.mutation.isPending
    }
}