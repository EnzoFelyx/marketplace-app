import { submitOrder } from "@/shared/services/order.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useSubmitOrdersMutation = () => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: submitOrder,
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ["user-orders"]
            })
        },
        onError: (error) => {
            Toast.error(error.message ?? "Falha ao realizar pedido", "top")
        }
    })

    return {
        mutation
    }
}