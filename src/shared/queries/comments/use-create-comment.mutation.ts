import { createCommentRequest } from "@/shared/interface/http/create-comment"
import { createComment } from "@/shared/services/product.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useCreateCommentMutation = (productId: number) => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (comment: createCommentRequest) => createComment(comment),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["user-comment", productId] })
            queryClient.invalidateQueries({ queryKey: ["product-comments", productId] })

            Toast.success(response.message || "Avaliação enviada com sucesso")
        },
        onError: (error) => {
            Toast.error(error.message ?? "Erro ao enviar avaliação, tente novamente mais tarde")
        }
    })

    return mutation
}