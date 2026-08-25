import { updateCommentRequest } from "@/shared/interface/http/update-comment"
import { updateUserComment } from "@/shared/services/product.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useUpdateCommentMutation = (productId: number) => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (comment: updateCommentRequest) => updateUserComment(comment),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["user-comment", productId] })
            queryClient.invalidateQueries({ queryKey: ["product-comments", productId] })

            Toast.success(response.message || "Avaliação atualizada com sucesso")
        },
        onError: (error) => {
            Toast.error(error.message ?? "Erro ao atualizar avaliação, tente novamente mais tarde")
        }
    })

    return mutation
}