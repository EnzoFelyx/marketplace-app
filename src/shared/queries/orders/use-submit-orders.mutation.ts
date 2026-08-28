import { submitOrder } from "@/shared/services/order.service"
import { useMutation } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useSubmitOrdersMutation = () => {

    const mutation = useMutation({
        mutationFn: submitOrder,
        onSuccess: (response) => {
            console.log(response.message)
        },
        onError: (error) => {
            console.log(error)
            Toast.error(error.message ?? "Falha ao realizar pedido", "top")
        }
    })

    return {
        mutation
    }
}