import { useCreateCreditCardMutation } from "@/shared/queries/credit-cards/use-create-credit-card.mutation"

export const useCardBottomSheetViewModel = () => {

    const createCreditCardMutation = useCreateCreditCardMutation()

    const handleCreateCreditCard = () => {
        createCreditCardMutation.mutate({
            CVV: 123,
            expirationDate: "",
            number: ""
        })
    }

    return {
        handleCreateCreditCard
    }
}