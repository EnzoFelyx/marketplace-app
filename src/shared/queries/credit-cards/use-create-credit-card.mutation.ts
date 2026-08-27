import { CreateCreditCardRequest } from "@/shared/interface/http/create-credit-card"
import { createCreditCard } from "@/shared/services/credit.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useCreateCreditCardMutation = () => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (creditCardData: CreateCreditCardRequest) => createCreditCard(creditCardData),
        onSuccess: (response) => {
            Toast.success(response.message ?? "Cartão criado com sucesso!")
            queryClient.invalidateQueries({
                queryKey: ["credit-cards"]
            })
        }
    })
    return mutation
}